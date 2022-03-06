import httpService from './http.service'

const todosEndpoint = 'todos'
const postsEndpoint = 'posts'

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    })
    return data
  },
  add: async () => {
    const { data } = await httpService.post(todosEndpoint, {
        title: "Hello World Test",
        completed: false,
        userId: 11,
        id: 11
    })
    return data
  },
}

export default todosService
