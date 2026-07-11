import { useEffect, useRef, useState } from "react"
import { CreateItemsPanel } from "./CreateItemsPanel"
import { CreateControlPanel } from "./CreateControlPanel"
import { CreatePalettePanel } from "./CreatePalettePanel"
import { DrawingCanvas } from "./DrawingCanvas"
import "../Css/CreatePage.css"
import {canvasElement, createPageProps, Project } from "../types"
import {palettes, categories} from "../constants"
import type {DragEndEvent, DragStartEvent} from "@dnd-kit/core"
import { DndContext, DragOverlay } from "@dnd-kit/core"
import {CANVAS_PIXEL_SIZE} from "../constants"
import { ElementPreviewView } from "./ElementPreviewView"
import { supabase } from "../../utils/supabase"

const testCanvas: canvasElement[] = [
    {   id: crypto.randomUUID(),
        category: categories.door,
        palette: palettes.blackWhite,
        x: 15,
        y: 30},
    {        
        id:  crypto.randomUUID(),
        category: categories.window,
        palette: palettes.redGreen,
        x: 100,
        y: 130}
]

const testCanvas2: canvasElement[] = [
    {   id: crypto.randomUUID(),
        category: categories.roof,
        palette: palettes.redGreen,
        x: 15,
        y: 130},
    {        
        id:  crypto.randomUUID(),
        category: categories.base,
        palette: palettes.yellowBlue,
        x: 100,
        y: 15}
]



export const CreatePage = ({user}: createPageProps) => {

    const [project, setProject] = useState<Project>()


    const [selectedPalette, setSelectedPalette] = useState<string>(palettes.yellowBlue)
  
    const [dragOffset, setDragOffset] = useState({x:0, y:0})

    const [canvasElements, setCanvasElements] = useState<canvasElement[]>(testCanvas2)

    const [history, setHistory] = useState<canvasElement[][]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)

    const [selectedElemId, setSelectedElemId] = useState<string | null>(null)
    
    const canvasRef = useRef<HTMLDivElement>(null)

    const [activeDrag, setActiveDrag] = useState<{generalElemId: string | number | null, category: string, palette: string} | null>(null)

    function handleDragStart(event: DragStartEvent) {

        const active = event.active
        const pointer = event.activatorEvent as PointerEvent

        const element = document.querySelector(
            `[data-id="${active.id}"]`
        ) as HTMLElement

        if(!element) return

        const rect = element.getBoundingClientRect()

        setDragOffset({
            x: pointer.clientX - rect.left,
            y: pointer.clientY - rect.top
        })

        setActiveDrag({
            generalElemId: active.id,
            category: active.data.current?.category,
            palette:  active.data.current?.palette,
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over} = event;

        if (!active || !over) {
            return
        }

        if (!canvasRef.current) return

  
        const rect = canvasRef.current.getBoundingClientRect()
        const startEvent = event.activatorEvent as PointerEvent;
        
        const dropX = Math.round(
        (startEvent.clientX - rect.left + event.delta.x - dragOffset.x)/CANVAS_PIXEL_SIZE) * CANVAS_PIXEL_SIZE

        const dropY = Math.round(
        (startEvent.clientY - rect.top + event.delta.y - dragOffset.y)/CANVAS_PIXEL_SIZE) * CANVAS_PIXEL_SIZE

        setActiveDrag(null)
    
        if(active.data.current?.type == "canvasElem"){
            const newElem: canvasElement = {
                id:  String(active.id) ,
                category: active.data.current?.category,
                palette: active.data.current?.palette,
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
                palette: active.data.current?.palette,
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

    const saveProject = async() => {
        if(!user) return

        if(!project) {
            await supabase
            .from("projects")
            .insert({
                user_id: user.id,
                canvas_elements: canvasElements
            })  
        }
        else {
            await supabase
            .from("projects")
            .update({
                project_name: project.project_name,
                canvas_elements: canvasElements
            })
            .eq("id", project.id)
        }
    }



    // const addElementOnCanvas = (elem: canvasElement) => {

    //     const newState = [...canvasElements, {
    //         id: elem.id,
    //         category: elem.category,
    //         x: elem.x,
    //         y: elem.y
    //     }]
    //     setCanvasElements(newState)

    //     changeHistory(newState)
    // }

    return (
        <div className="createPageWrapper">
            <DndContext 
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}>

                <div className="menuBarsContainer">
                    <div className="leftControlPanel">
                        <CreateItemsPanel selectedPalette={selectedPalette}/>
                    </div>
                        
                    <div className="canvasWrapper" >
                       
                        <DrawingCanvas canvasRef={canvasRef} setSelectedElemId={setSelectedElemId} selectedElemId={selectedElemId}  changeHistory={changeHistory} canvasElements={canvasElements} setCanvasElements={setCanvasElements} />
                    </div>

                    <div className="rightControlPanel">
                        <CreatePalettePanel setSelectedPalette={setSelectedPalette} />


                        <div className="createControlPanel">
                            <CreateControlPanel undo={undo} redo={redo} saveProject={saveProject} />                    
                        </div>
                    </div>
                </div>
                <DragOverlay dropAnimation={null}>
                {activeDrag && (
                    <ElementPreviewView
                        elemGeneral={{
                            id: String(activeDrag.generalElemId),
                            category: activeDrag.category,
                            palette: activeDrag.palette,
                        }}
                    />
                )}
                </DragOverlay>
            </DndContext>
        </div>
    )
}