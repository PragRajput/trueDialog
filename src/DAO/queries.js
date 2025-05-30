

const getData = (model, query, projection, options) => {
    return new Promise((resolve, reject) => {
        try{
            let fetch_data = model.find(query, projection, options);
            return resolve(fetch_data);
        }catch(err){
            return reject(err)
        }
    })
}

const saveSessionData = async (model, data) => {
    try{
        console.log("saveData :: ",model, data)
        let save_info = await model.findOneAndUpdate(
            { _id: data._id }, 
            { $set: { access_token: data.access_token } }, // Use $set for updating specific fields
            { new: true, lean: true } 
        );
        if(!save_info){
            // console.log("if no response from save_info")
            let save_info = await model.create(data);
            return save_info;
        }
      
        // console.log("save_info ::",save_info)
        return save_info;
    }catch(err){
        return reject(err)
    }
}

const saveData = async (model, data) => {
    
        try{
            console.log("saveData :: ",model, data)
                let save_info = await model.create(data);
                return (save_info);
            }
        catch(err){
            throw err;
        }
}

const deleteData = async (model, data) => {
    try{
        console.log("deleteData :: ",model, data)
            let save_info = await model.deleteOne(data);
            return save_info;
        }
    catch(err){
        throw err;
    }
}

const findAndUpdate = (model, query, update, options) => {
    console.log('findAndUpdate:::::',model, query, update, options)
    return new Promise((resolve, reject) => {
        try {
            console.log(model, query, update, options)
            let update_data = model.findOneAndUpdate(query, update, options);
            return resolve(update_data);

        } catch (err) {
            return reject(err);
        }
    });
}
const insertMany = (model, data, options) => {
    return new Promise((resolve, reject) => {
        try {

            let saveData = model.collection.insertMany(data, options);
            return resolve(saveData);

        }
        catch (err) {
            return reject(err);
        }
    });
}


const removeMany = (model, query) => {
    return new Promise((resolve, reject) => {
        try {

            let delete_data = model.deleteMany(query);
            return resolve(delete_data);

        } catch (err) {
            return reject(err);
        }
    });
}

const countData = (model, query) => {
    return new Promise((resolve, reject) => {
        try {

            let fetch_data = model.count(query);
            return resolve(fetch_data);

        } catch (err) {
            return reject(err);
        }
    });
}

const populateData = async (model, query, projection, options, collection_options) => {
    try {
        let fetch_data = await model.find(query, projection, options).populate(collection_options).exec();
        return fetch_data;
    } catch (err) {
        throw err;
    }
};
const countDocuments = async (model, query) => {
    try {
      const count = await model.countDocuments(query).exec();
      return count;
    } catch (err) {
      console.error("Error counting documents:", err);
      throw err;
    }
  };

module.exports = {
    getData,
    saveData, 
    findAndUpdate,
    insertMany,
    removeMany,
    countData,
    populateData,
    saveSessionData,
    deleteData,
    countDocuments
}

