// import { shuffle } from '../../shared/util/algorithm';
// import {
//   importCards,
//   ImportRaw,
// } from '../../entities/card/model/actions/importCards';

import {importCards, ImportRaw} from "../../entities/card/model/actions/importCards";
import {shuffle} from "../../shared/util/algorithm";

const renderSettingsPage = () => {
  const importBulkCards = async (count?: number) => {
    let data = (await fetch(
      'https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/storage/storage/eng-ukr.json',
    ).then((response) => response.json())) as ImportRaw[];

    if (count !== null) {
      shuffle(data);

      data = data.slice(0, count);
    }

    return importCards(data)
      .then(() => {
        console.log('Complete')
      })
      .catch((err) => {
        console.error(err);
      });
  };

  importBulkCards(10)

  document.body.style.display = '';
};

export { renderSettingsPage };
