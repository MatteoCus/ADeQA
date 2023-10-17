export interface Message{
    token: string,
    lang: string,
    theme: 'DM' | 'WM',
    username: string,
    m_product_id: number,
    c_projectphase_id: number,
    user_id: number
}