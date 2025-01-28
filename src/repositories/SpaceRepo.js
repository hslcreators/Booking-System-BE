import { Space } from "../models/space";

class SpaceRepo {
    //Database activities
    async createSpace(data){
        //error handling needed
        const space = new Space({
            name: data.name,
            location: data.location,
            capacity: data.capacity,
            description: data.description
        })
        space.save();
        return space
    }

    async getSpace(data){
        let space = Space.findOne({data})
        return space
    }

    async getallSpaces(itemsperPage, pageNo){
        let spaces;
        Space.find({}, (err, spaceList) => {
            if(err) throw new Error("Error Finding Space")
            if(spaceList) spaces = spaceList
        }).skip((pageNo - 1) * itemsperPage).limit(itemsperPage)
        return spaces
    }

    // async fetchSpace(data){
    //     let spaces;
    //     Space.find({data}, (err, spaceList) => {
    //         if(err) throw new Error("Error Finding Space")
    //         if(spaceList) spaces = spaceList
    //     })
    //     return spaces
    // }

    async deleteSpace(id){
        Space.findByIdAndDelete(id);
    }

}

export default SpaceRepo