import { Space } from "../models/space.js";

class SpaceRepo {
    // Create a new space
    async createSpace(data) {
        try {
            const space = new Space(data);
            await space.save();
            return space;
        } catch (error) {
            throw new Error(`Error creating space: ${error.message}`);
        }
    }

    async getSpace(query) {
        try {
            const space = await Space.findOne(query);
            if (!space) {
                throw new Error("Space not found");
            }
            return space;
        } catch (error) {
            throw new Error(`Error fetching space: ${error.message}`);
        }
    }

    async getallSpaces(itemsPerPage, pageNo) {
        try {
            const skip = (pageNo - 1) * itemsPerPage;
            const spaces = await Space.find({})
                .skip(skip)
                .limit(itemsPerPage)
                .exec();
            return spaces;
        } catch (error) {
            throw new Error(`Error fetching spaces: ${error.message}`);
        }
    }

    async  querySpaceBy(data) {
        try {
            let spaces = await Space.find(data)
            if (!spaces) throw new Error("No Space Matching Query")
            return spaces
        } catch (error) {
            throw new Error(`Error fetching spaces: ${error.message}`);
        }
    }

    // Delete a space by ID
    async deleteSpace(id) {
        try {
            const deletedSpace = await Space.findByIdAndDelete(id);
            if (!deletedSpace) throw new Error("Space not found");
            return deletedSpace;
        } catch (error) {
            throw new Error(`Error deleting space: ${error.message}`);
        }
    }
}

export default SpaceRepo;