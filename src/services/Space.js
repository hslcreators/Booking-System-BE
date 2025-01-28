require('dotenv').config()
import SpaceRepo from '../repositories/SpaceRepo.js'

class SpaceService extends SpaceRepo {
    //Service layer
    async registerSpace(data){
        //Manipulate data or validate
        let {name, location, description} = data
        if(!name || !location || !description) throw new Error('Incomplete data')
        let space = await this.createSpace(data)
        if(!space || space.err){
            //fix error handling
            throw new Error('Error Creating Users')
        }
        return space
    }

    async fetchSpaceBy(data){
        let {name, location, capcity, description} = data
        let queryData = {
            ...(name && {name}),
            ...(location && {location}),
            //fix capacity so search for higher equal number
            ...(capcity && {capcity}),
            ...(description && {description})
        }
        let spaces = await this.fetchSpace(queryData)
        return spaces
    }

    async getAndDeleteSpace(data) {
            const space = await this.getSpace(data);
            if (!space) throw new Error(`Space not found for the provided data: ${JSON.stringify(data)}`);
                const result = await this.deleteSpace(space._id);
    
            return { success: true, message: "Space fetched and deleted successfully.", details: result };
    }
}

export default SpaceService