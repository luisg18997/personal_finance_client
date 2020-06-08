import history from './history'

export const RedirectPage = (route, state) => {
    history.push(route, {...state})
}
