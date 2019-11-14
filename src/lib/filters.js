function hashtags (filterValue, message) {
  return message.hashtags
    .filter((hashtag) => filterValue.includes(hashtag)).length
}

function type (filterValue, message) {
  let filter

  function recursiveFilter (message) {
    let filteredReplies = false
    if (message.replies) {
      filteredReplies = message.replies
        .map(recursiveFilter)
        .some((filteredReply) => filteredReply)
    }
    return filter(message) || filteredReplies
  }

  if (filterValue === 'images') {
    filter = (message) => message.message.photo && message.message.photo.length
  } else if (filterValue === 'documents') {
    filter = (message) => message.files && message.files.length &&
      message.files.some((file) => file.mime_type === 'application/pdf')
  } else if (filterValue === 'audio') {
  } else if (filterValue === 'video') {
  } else if (filterValue === 'links') {
  }

  if (filter) {
    return recursiveFilter(message)
  }

  return true
}

export default {
  hashtags,
  type
}
