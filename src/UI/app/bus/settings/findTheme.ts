import FindThemeHandler from '../../../../Application/Query/Theme/FindThemeHandler';
import make from '../services';
import WindowIdentifyColorScheme from '../../../../Infrastructure/Service/Settings/WindowIdentifyColorScheme';
import LSSettingsQueryRepository from '../../../../Infrastructure/Persistence/Settings/Repository/LSSettingsQueryRepository';

const handler = new FindThemeHandler(
  make(WindowIdentifyColorScheme),
  make(LSSettingsQueryRepository),
);

export default handler.invoke.bind(handler);
