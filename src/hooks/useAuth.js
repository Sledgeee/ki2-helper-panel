import Cookies from 'js-cookie'

export const useAuth = () => Cookies.get('token') || ''
