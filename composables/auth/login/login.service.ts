import { useFetchApi } from "~~/composables/api/useFetchApi"
import { AuthTokens, Identity } from "~~/composables/auth/Auth.interface"
import { CLIENT_ID, CLIENT_SECRET } from "~~/composables/api/api.config"
import { InferType } from "yup"
import { useLoginValidator } from "./login.validator"
import { FetchCustomConfig } from "~~/composables/api/FetchCustomConfig"
import { LoginDto } from "./Login.dto"
export const useLoginService = () => {
    const fetchData = useFetchApi<{ tokens: AuthTokens, identity: Identity },LoginDto>(LoginDto);
    const {schema} = useLoginValidator()
    const login = ({ username, password }:InferType<typeof schema>, customConfig:FetchCustomConfig={}) => {
        return fetchData("oauth2/rest/token", {
            method: "post",
            body: {
                username,
                password,
                grant_type: "password",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }
        }, customConfig).then((response: any) => {
            if (response !== undefined) {
                const { access_token, refresh_token, expires_in, identity } = response
                return {
                    tokens: {
                        accessToken: access_token,
                        refreshToken: refresh_token,
                        expiresIn: new Date().getTime() + expires_in * 1000
                    },
                    identity: identity
                }
            }
            return response
        })
    }
    return { login }
}