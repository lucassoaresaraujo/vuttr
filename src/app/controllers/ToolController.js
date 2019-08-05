import { Op } from 'sequelize';

import db from '../../database';

import Tool from '../models/Tool';
import Tag from '../models/Tag';

class ToolController {
  async index(req, res) {
    const where = {};

    const { tag: filterTag } = req.query;

    if (filterTag) {
      const filteredTools = await Tool.findAll({
        attributes: ['id'],
        include: [
          {
            as: 'tags',
            model: Tag,
            attributes: ['name'],
            required: true,
            through: {
              attributes: [],
            },
            where: {
              name: filterTag,
            },
          },
        ],
      });

      where.id = {
        [Op.in]: filteredTools.map(tool => tool.id),
      };
    }

    let tools = await Tool.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      where,
      include: [
        {
          as: 'tags',
          model: Tag,
          attributes: ['name'],
          required: false,
          through: {
            attributes: [],
          },
        },
      ],
    });

    tools = tools.map(tool => {
      const { id, title, link, description, tags } = tool;
      return {
        id,
        title,
        link,
        description,
        tags: tags.map(tag => tag.name),
      };
    });

    return res.json(tools);
  }

  async store(req, res) {
    let transaction;
    try {
      transaction = await db.connection.transaction();

      const tool = await Tool.create(req.body, { transaction });

      const { tags } = req.body;
      if (tags) {
        const promisesTags = tags.map(name =>
          Tag.findOrCreate({ where: { name }, transaction })
        );
        let createdTags = await Promise.all(promisesTags);
        createdTags = createdTags.map(resultFindOrCreate => {
          const [tag] = resultFindOrCreate;
          return tag;
        });
        await tool.setTags(createdTags, { transaction });
      }

      await transaction.commit();

      let createdTool = await Tool.findOne({
        where: {
          id: tool.id,
        },
        include: [
          {
            as: 'tags',
            model: Tag,
          },
        ],
      });

      const { id, title, link, description, tags: createdTags } = createdTool;
      createdTool = {
        id,
        title,
        link,
        description,
        tags: createdTags.map(tag => tag.name),
      };

      return res.status(201).json(createdTool);
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const destroyedRows = await Tool.destroy({ where: { id } });

    if (destroyedRows) {
      return res.status(200).send();
    }
    return res.status(404).send();
  }
}

export default new ToolController();
