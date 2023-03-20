import typeorm from "typeorm";
const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: "Todo",
  tableName: "todo",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    done: {
      type: "varchar",
      default: false
    },
  },
  relations: {
    owner: {
      target: "Categorie",
      type: "many-to-one",
      inverseSide: "todo",
      joinColumn: {
        name: "categorie_id",
      },
      onDelete: "CASCADE",
    },
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
      },
      cascade: true,
      onDelete: "CASCADE",
    },
  },
});
