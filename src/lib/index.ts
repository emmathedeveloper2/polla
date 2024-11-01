// place files you want to import through the `$lib` alias in this folder.
export const resolve_promise = async <T>(callback: () => Promise<T>) : Promise<[ result: T | null , error: any ]> => {

    try {
        const result = await callback()

        return [ result , null ]
    } catch (error) {
        return [ null , error ]
    }
}

