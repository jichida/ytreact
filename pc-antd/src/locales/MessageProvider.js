import en from '../locales/en.json'
import zhcn from '../locales/zhcn.json'
import zhtw from '../locales/zhtw.json'

// ja is the base language, messages in other language derives from it and can override the message using the same message id, if a message id does not exist in the target language,falls back to ja.

// const mergeWithBaseMessages = localizedMessages =>
//   Object.keys(localizedMessages).reduce((messageMap, key) => {
//     messageMap[key] = localizedMessages[key]
//     return messageMap
//   }, Object.assign({}, zh))

// default language is en.
export default localeWithoutRegion => {
  // debugger;
  let localizedMessages = null
  switch (localeWithoutRegion) {
    case 'zh-cn':
      localizedMessages = zhcn
      break
    case 'zh-tw':
      localizedMessages = zhtw
      break
    case 'en':
      localizedMessages = en
      break
    default:
      localizedMessages = en
  }
  const retjson = localizedMessages;
  console.log(retjson);
  return retjson;
}
