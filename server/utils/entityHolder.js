// Made by Cena Abachi Known as Devlogerio, find me on Youtube, Instagram, and Github: Devlogeiro LinkedIn: Cena Abachi, devloger.io@gmail.com
const {Sperm} = require('./sperm');
const {Jammer} = require('./jammer');
const {Hammer} = require('./hammer');
const {Killer} = require('./killer');
const {Sticky} = require('./sticky');
const {Food} = require('./food');

// This class is for keeping the data of all entities in itself
class EntityHolder {
    // when we are making a new EntityHolder we should tell it what it is for
    constructor (kind) {
        this.kind = kind;
        this.entities = []; // this is where the class keeps all of its entities
    }
    // it will update all stored entities
    updateEntities () {
        this.entities.forEach((entity) => { // looping through all entities
            entity.update();
        });
    }
    // adds a new entity to its list
    addEntity (data) {
        var newEntity;
        if(this.kind === 'sperm'){
            newEntity = new Sperm(data.id, data.name, data.childName, data.room);
            if(newEntity) {
                this.entities.push(newEntity);
                newEntity.spawn();
            }
        }
        else if(this.kind === 'jammer'){
            newEntity = new Jammer(data.id, data.room);
            if(newEntity) {
                this.entities.push(newEntity);
                newEntity.spawn();
            }
        }
        else if(this.kind === 'hammer'){
            newEntity = new Hammer(data.id, data.room);
            if(newEntity) {
                this.entities.push(newEntity);
                newEntity.spawn();
            }
        }
        else if(this.kind === 'killer'){
            newEntity = new Killer(data.id, data.room);
            if(newEntity) {
                this.entities.push(newEntity);
                newEntity.spawn();
            }
        }
        else if(this.kind === 'food'){
            newEntity = new Food(data.id, data.room, data.where);
            if(newEntity) {
                this.entities.push(newEntity);
                newEntity.spawn();
            }
        }
        else if(this.kind === 'sticky'){
            newEntity = new Sticky(data.id, data.room);
            if(newEntity) {
                this.entities.push(newEntity);
                newEntity.spawn();
            }
        }
        return newEntity;
    }
    // removes specific entity known by its id
    removeEntity (id) {
        var theEntity = this.getEntity(id);
        if (theEntity) {
            this.entities = this.entities.filter((entity) => entity.id !== id); // deletes the one mentioned
        }
        return theEntity; // we return the removed entity
    }
    // get the specific entity by its id
    getEntity (id) {
        return this.entities.filter((entity) => entity.id === id)[0];
    }
    // returning the list of entities
    getEntityIdList () {
        return this.entities.map((entity) => entity.id);
    }
    getEntitiesStandAloneServerMomentPack() {
        var entities = this.entities.map((entity) => entity.getStandAloneServerMomentPack());
        return entities;
    }
    // gets specific packages from each entity and returns them
    getPackFromAllEntities (room, whatFor) {
        var entities = this.entities.filter((entity) => entity.room === room);
        if (whatFor === 'init') {
            return entities = entities.map((entity) => entity.getInitPack());
        } else if (whatFor === 'moment') {
            return entities = entities.map((entity) => entity.getMomentPack());
        } else {
            return;
        }
    }
}

module.exports = {EntityHolder};

