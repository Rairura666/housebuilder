import { useRef, useState } from "react"
import { CreateItemsPanel } from "./CreateItemsPanel"
import { CreateControlPanel } from "./CreateControlPanel"
import { CreatePalettePanel } from "./CreatePalettePanel"
import { DrawingCanvas } from "./DrawingCanvas"
import "../Css/CreatePage.css"
import {canvasElement } from "../types"
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core"

export const CreatePage = () => {

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>([])

    const [history, setHistory] = useState<canvasElement[][]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)

    const [selectedElemId, setSelectedElemId] = useState<string | null>(null)
    
    const canvasRef = useRef<HTMLDivElement>(null)

    function handleDragEnd(event: DragEndEvent) {
        const { active, over} = event;

        if (!active || !over) {
            return
        }

        if (!canvasRef.current) return
    
        const rect = canvasRef.current.getBoundingClientRect()
        const startEvent = event.activatorEvent as PointerEvent;

        const dropX = startEvent.clientX - rect.left + event.delta.x;
        const dropY = startEvent.clientY - rect.top + event.delta.y;


        if(active.data.current?.type == "canvasElem"){
            const newElem: canvasElement = {
                id:  String(active.id) ,
                category: active.data.current?.category,
                x: dropX,
                y: dropY
            }
            setCanvasElements(prev => {
                const newState = [...prev.filter(prev => prev.id != active.id), newElem]
                changeHistory(newState)
                return newState
            })
        }
        else {
            setCanvasElements(prev => {
                const newElem: canvasElement = {
                id:  crypto.randomUUID(),
                category: active.data.current?.category,
                x: dropX,
                y: dropY
            }
            const newState = [...prev, newElem]
            changeHistory(newState)
            return newState
            })
        }

    }   

    const changeHistory = (newState: canvasElement[]) => {

        setHistory(prev => {
            const cutHistory = prev.slice(0, historyIndex + 1)
            const updatedHistory = [...cutHistory, newState]

            setHistoryIndex(updatedHistory.length - 1)
            return updatedHistory
        })
    }

    const undo = () => {
        if (historyIndex < 0) {
            return
        }

        setHistoryIndex(prev => prev - 1)
        setCanvasElements(history[historyIndex - 1] ?? [])
    }

    const redo = () => {
        if (historyIndex == history.length - 1) {
            return
        }

        setHistoryIndex(prev => prev + 1)
        setCanvasElements(history[historyIndex + 1])
    }


    const addElementOnCanvas = (elem: canvasElement) => {

        const newState = [...canvasElements, {
            id: elem.id,
            category: elem.category,
            x: elem.x,
            y: elem.y
        }]
        setCanvasElements(newState)

        changeHistory(newState)
    }

    return (
        <div className="createPageWrapper">
            <DndContext onDragEnd={handleDragEnd}>
            <div className="menuBarsContainer">
                <div className="leftControlPanel">
                    <CreateItemsPanel addElementOnCanvas={addElementOnCanvas} />
                </div>

                <div className="canvasWrapper" >
                    <DrawingCanvas canvasRef={canvasRef} setSelectedElemId={setSelectedElemId} selectedElemId={selectedElemId}  changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements={setCanvasElements} />
                </div>

                <div className="rightControlPanel">
                    <CreatePalettePanel />
                    <div className="createControlPanel">
                        <CreateControlPanel undo={undo} redo={redo} />                    
                    </div>
                </div>
            </div>
            </DndContext>
        </div>
    )
}