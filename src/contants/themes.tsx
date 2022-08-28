import { Theme } from '../interfaces/themes'

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#0000FF',
    background: '#F5F8FA',
    card: '#E8F5FA',
    text: '#484A4A',
    border: '#D9D9D9',
    notification: '#0000FF'
  }
}

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#0000FF',
    background: '#000000',
    card: '#606061',
    text: '#E3E3E6',
    border: '#818182',
    notification: '#000C66'
  }
}
