'use strict';

class TacoModel{
  constructor(){
    this.id = 0;
    this.db = [];
  }
  get(id) {
    if (id) { // We were given a specific id
      return this.db.find(record => record.id === id); // Return the record object matching the id
    } else { // We weren't given an id
      return this.db; // Return everything
    }
  }
  post(obj) {
    const postObject = {
      id: ++this.id, // What is the current.id on our Taco model? Out object.id is that + 1.
      name: obj.name,
      type: obj.type,
    };
    this.db.push(postObject); // Pretty relaxed validation, but I'll let it slide.
    return postObject; //Show the user what we've posted, including the id we attached.
  }
  update(id, obj) {
    let errors = {};
    if (!id) {
      if(!obj.id) {
        errors.id = 'Please use an id with PUT';
        return errors;
      }
    } else {
      // Do input validation. I'm sure we could use our validator function. Instead:
      if (!obj) { // They did send something, right?
        let needDataError = 'No update to this taco specified...';
        return needDataError; // Fall dead, but let our user know why.
      } else {
        if(!obj.name) {
          errors.name = 'Please add a taco name';
        }
        if(!obj.type) {
          errors.type = 'Please add a taco type';
        }
        if(Object.keys(errors).length > 0) {
          return errors;
        }

        // Find the object in the db and update it with updateObj.
        let dbObj = this.db.find(record => record.id === id); // find record, assign to dbObj
        dbObj = {...dbObj, ...obj};
        return dbObj;
      }
    }
  }
  delete(id) {
    let errors = {};
    if (!id) {
      errors.type = 'Please add a taco id';
      return errors;
    } else {
      this.db = this.db.filter(record => {
        if (record.id !== id) {
          return record; // Found it, let filter know.
        }
      });
    }
  }
}

module.exports = TacoModel;
