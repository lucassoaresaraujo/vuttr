module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('tool_tags', {
        tool_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tools',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        tag_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'tags',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        return queryInterface.addConstraint(
          'tool_tags',
          ['tool_id', 'tag_id'],
          {
            type: 'primary key',
            name: 'tool_tags_pk',
          }
        );
      })
      .then(() => {
        return queryInterface.addConstraint('tool_tags', ['tool_id'], {
          type: 'foreign key',
          name: 'tool_fkey',
          references: {
            table: 'tools',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      })
      .then(() => {
        return queryInterface.addConstraint('tool_tags', ['tag_id'], {
          type: 'foreign key',
          name: 'tag_fkey',
          references: {
            table: 'tags',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },

  down: queryInterface => {
    return queryInterface.dropTable('tool_tags');
  },
};
