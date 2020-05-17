const config = {
  style: [],
  content: [],
  interact: []
}

const batch = (childrens) => {
  return childrens.length > 1
    ? {
      id: 'multiple',
      type: 'multiple',
      ...getData(),
      childrens
    }
    : {}
}

const getData = () => {
  return {
    style: {},
    content: {},
    interact: {}
  }
}

export default {
  config,
  batch
}
