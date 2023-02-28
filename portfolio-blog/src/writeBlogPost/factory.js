import { Client, Entity, Schema, Repository } from 'redis-om';

const blogSchemaDef = {
  title: { type: 'string'},
  theme: { type: 'string'},
  imageUrl: { type: 'string'},
  likes: { type: 'number'},
  views: { type: 'number'},
};
const blogSchemaOptions = { dataStructure: 'JSON' };

export function getClient(){
  return new Client();
};

class BlogPost extends Entity{}

export function getSchema(){
  const schema = new Schema(BlogPost, blogSchemaDef, blogSchemaOptions);
  return schema;
};

export function getRepository(schema, client){
  const repository = new client.fetchRepository(schema);
  return repository;
};