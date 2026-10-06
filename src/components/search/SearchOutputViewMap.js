import BaseView from '../views/BaseView'
import CalendarView from '../views/CalendarView'
import ErrorView from '../views/ErrorView'
import HelpView from '../views/HelpView'
import LensView from '../views/LensView'
import PokemonListView from '../views/PokemonListView'
import TestView from '../views/TestView'
import UnicodeView from '../views/UnicodeView'

export const viewMap = {
  BaseHandler: new BaseView(),
  CalendarHandler: new CalendarView(),
  ErrorHandler: new ErrorView(),
  HelpHandler: new HelpView(),
  LensHandler: new LensView(),
  UnicodeHandler: new UnicodeView(),
  PokemonHandler: new PokemonListView(),
  TestHandler: new TestView(),
}
