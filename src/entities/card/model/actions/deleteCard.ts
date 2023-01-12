import {findCardByIdQuery} from "../../database/repository/query";
import {deleteCardQuery} from "../../database/repository/command";

export const deleteCard = async (id: string): Promise<void> => {
  const card = await findCardByIdQuery(id);

  if (undefined === card) {
    return;
  }

  await deleteCardQuery(card);
};
