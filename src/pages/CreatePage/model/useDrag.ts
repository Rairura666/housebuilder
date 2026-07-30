import { DragStartEvent, DragEndEvent } from "@dnd-kit/core"
import { CANVAS_PIXEL_SIZE } from "../../../shared/config/constants"
import { canvasElement } from "../../../shared/types/types"
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react"
import { useHistory } from "./useHistory"

export const useDrag = (canvasRef: RefObject<HTMLDivElement | null>, setCanvasElements: Dispatch<SetStateAction<canvasElement[]>>, setIsUnsaved: Dispatch<SetStateAction<boolean>>) => {

    const [activeDrag, setActiveDrag] = useState<{ generalElemId: string | number | null, category: string, palette: string } | null>(null)

    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

    const { changeHistory } = useHistory(setCanvasElements)

    function handleDragStart(event: DragStartEvent) {

        const active = event.active
        const pointer = event.activatorEvent as PointerEvent

        const element = document.querySelector(
            `[data-id="${active.id}"]`
        ) as HTMLElement

        if (!element) return

        const rect = element.getBoundingClientRect()

        setDragOffset({
            x: pointer.clientX - rect.left,
            y: pointer.clientY - rect.top
        })

        setActiveDrag({
            generalElemId: active.id,
            category: active.data.current?.category,
            palette: active.data.current?.palette,
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!active || !over) {
            return
        }

        if (!canvasRef.current) return

        setIsUnsaved(true)
        
        const rect = canvasRef.current.getBoundingClientRect()
        const startEvent = event.activatorEvent as PointerEvent;

        const dropX = Math.round(
            (startEvent.clientX - rect.left + event.delta.x - dragOffset.x) / CANVAS_PIXEL_SIZE) * CANVAS_PIXEL_SIZE

        const dropY = Math.round(
            (startEvent.clientY - rect.top + event.delta.y - dragOffset.y) / CANVAS_PIXEL_SIZE) * CANVAS_PIXEL_SIZE

        setActiveDrag(null)

        if (active.data.current?.type == "canvasElem") {
            const newElem: canvasElement = {
                id: String(active.id),
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
                    id: crypto.randomUUID(),
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

    return { handleDragStart, handleDragEnd, activeDrag }
}

