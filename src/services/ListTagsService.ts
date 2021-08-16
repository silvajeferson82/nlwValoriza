import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer"

class ListTagsService{
  async execute(){
    const tagsrepositories = getCustomRepository(TagsRepositories);

    let tags = await tagsrepositories.find();
    // tags = tags.map((tag) =>({...tag, nameCustom: `#${tag.name}` }));

    return classToPlain(tags);
  }
}

export { ListTagsService }; 