import { useEffect} from "react"
import {  drawingCanvasProps } from "../../../shared/types/types"
import { useDroppable } from "@dnd-kit/core"
import { CanvasElement } from "../../../entities/canvasElement/ui/CanvasElement"
import "./DrawingCanvas.css"
import { CANVAS_PIXEL_SIZE } from "../../../shared/config/constants"

export const DrawingCanvas = ({ canvasRef, setSelectedElemId, selectedElemId, canvasElements, setCanvasElements, changeHistory, newCanvasWidth, newCanvasHeight, setIsUnsaved}: drawingCanvasProps) => {

    const { setNodeRef } = useDroppable({
        id: 'canvasId',
    })

    const moveSelectedElement = (xShift: number, yShift: number) => {

        if (selectedElemId == null) {
            return
        }

        setCanvasElements(prev => {
            const newState = prev.map(
                elem => elem.id === selectedElemId ?
                    {
                        id: elem.id,
                        category: elem.category,
                        palette: elem.palette,
                        x: elem.x + xShift,
                        y: elem.y + yShift
                    }
                    : elem
            )

            changeHistory(newState)
            setIsUnsaved(true)
            return newState
        })
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key == "ArrowUp") {
                moveSelectedElement(0, -1 * CANVAS_PIXEL_SIZE)
            }

            if (e.key == "ArrowDown") {
                moveSelectedElement(0, 1 * CANVAS_PIXEL_SIZE)
            }

            if (e.key == "ArrowLeft") {
                moveSelectedElement(-1 * CANVAS_PIXEL_SIZE, 0)
            }

            if (e.key == "ArrowRight") {
                moveSelectedElement(1 * CANVAS_PIXEL_SIZE, 0)
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }

    }, [selectedElemId, canvasElements])

    const setCanvasRef = (node: HTMLDivElement | null) => {
        setNodeRef(node)
        canvasRef.current = node
    }

    return (<>
        {/* <Moveable
            target={isCanvasSelected ? canvasRef.current : null}
            resizable={true}
            draggable={true}
            keepRatio={false}
            throttleResize={CANVAS_PIXEL_SIZE}
            renderDirections={["n", "s", "e", "w", "nw", "ne", "sw", "se",]} 

            onResize={e => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
            }}
        /> */}

        <div
            ref={setCanvasRef}
            className="canvas"
            // onClick={() => {
            //     setSelectedElemId(null)
            //     setIsCanvasSelected(!isCanvasSelected)
            // }}
            style={{
                width: newCanvasWidth < 100 ? newCanvasWidth * CANVAS_PIXEL_SIZE : 10 *CANVAS_PIXEL_SIZE,
                height: newCanvasHeight < 100 ? newCanvasHeight * CANVAS_PIXEL_SIZE : 10 *CANVAS_PIXEL_SIZE,
                maxWidth: "auto",
                maxHeight: "auto",
                minWidth: "auto",
                minHeight: "auto",
            }} 
        >
            {canvasElements.map(elem =>
                <div
                    key={elem.id}
                    onPointerDown={
                        (e) => {
                            e.stopPropagation()
                            setSelectedElemId(elem.id)
                        }}
                    className="canvasElem"
                    style={{
                        position: "absolute",
                        left: elem.x,
                        top: elem.y,
                    }}>
                    <CanvasElement selected={selectedElemId == elem.id} elem={elem} />
                </div>)}
        </div>
    </>
    )
}