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
    },
  },
  relations: {
    owner: {
      target: "Categorie",
      type: "many-to-one",
      inverseSide: "todo",
      JoinColumn: {
        name: "categorie_id",
      },
      onDelete: "CASCADE",
    },
  },
});
