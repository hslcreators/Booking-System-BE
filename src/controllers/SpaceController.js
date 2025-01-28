import SpaceService from "../services/Space";

const spaceService = new SpaceService();

// Routes Logic
export const createSpaceController = async (req, res) => {
    try {
        let { name, loaction, capacity, description } = req.body
        let spaceData = { name, loaction, capacity, description}
        let isCreated = await spaceService.registerSpace(spaceData)
        if (isCreated) res.status(200).json({message: "Space Created"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const fetchSpaceController = async (req, res) => {
    try {
        let spaces = await spaceService.getallSpaces()
        if (spaces) res.status(200).json({spaces})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteSpaceController = async (req, res) => {
    try {
        let id = req.params.id
        let spaceData = {id: id}
        let isDeleted = await spaceService.getAndDeleteSpace(spaceData)
        if (isDeleted.success) res.status(200).json({message: "Space Succesfully Deleted"})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}