import SpaceRepo from '../repositories/SpaceRepo.js'

class SpaceService extends SpaceRepo {
    // Service layer

    async registerSpace(data) {
        try {
            const { name, location, description } = data;
            if (!name || !location || !description) throw new Error("Incomplete data: name, location, and description are required.");
            const space = await this.createSpace(data);
            if (!space) throw new Error("Error creating space.");

            return space;
        } catch (error) {
            throw new Error(`Error registering space: ${error.message}`);
        }
    }

    async fetchSpaceBy(data) {
        try {
            const { name, location, capacity, description } = data;

            const queryData = {
                ...(name && { name }),
                ...(location && { location }),
                ...(capacity && { capacity: { $gte: capacity } }),
                ...(description && { description }),
            };
            const spaces = await this.fetchSpaceBy(queryData);
            if (!spaces) throw new Error("No spaces found matching the criteria.");
            return spaces;
        } catch (error) {
            throw new Error(`Error fetching spaces: ${error.message}`);
        }
    }

    async getAndDeleteSpace(data) {
        try {
            const space = await this.getSpace(data);
            if (!space) throw new Error(`Space not found for the provided data: ${JSON.stringify(data)}`);
            const result = await this.deleteSpace(space._id);
            if (!result) throw new Error("Error deleting space.");
            return {
                success: true,
                message: "Space fetched and deleted successfully.",
            };
        } catch (error) {
            throw new Error(`Error in getAndDeleteSpace: ${error.message}`);
        }
    }
}

export default SpaceService;