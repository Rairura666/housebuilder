import { toPng } from 'html-to-image'

export const convertCanvasToPng = async(ref: React.RefObject<HTMLDivElement | null>) => {

    if (!ref.current) return

    const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 4
    })

    return dataUrl
}