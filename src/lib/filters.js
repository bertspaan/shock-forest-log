function hashtags (filterValue, message) {
  return message.hashtags
    .filter((hashtag) => filterValue.includes(hashtag)).length
}

function type (filterValue, message) {
  if (filterValue === 'images') {
    return message.message.photo && message.message.photo.length
  }
  return true
}

export default {
  hashtags,
  type
}
