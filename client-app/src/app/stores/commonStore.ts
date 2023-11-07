import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null;

    /**
    Get the token from browser's local storage so user's token won't
    become null upon refreshing the web page. 
    */ 
    token: string | null | undefined = localStorage.getItem('jwt');

    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token) {
                    localStorage.setItem('jwt', token)
                }
                else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null | undefined) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}