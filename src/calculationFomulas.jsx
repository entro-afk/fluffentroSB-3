export const L5Calculation = function L5Calculation(
  targetBook,
  L5_Books_Needed_Mapping,
  L4_Books_Needed_Mapping,
  L3_Books_Needed_Mapping,
  L2_Books_Needed_Mapping,
  copyOfBookOwnedQuantities,
  ownedBooks,
  baseNeeds
) {

  if(L5_Books_Needed_Mapping[targetBook])
    for (let L4Book of L5_Books_Needed_Mapping[targetBook]){
      console.log('is this getting here---- L5')
       if (updateBookQuantitiesCopyAndContinueBool(L4Book, ownedBooks, copyOfBookOwnedQuantities)) continue
      if(L4_Books_Needed_Mapping[L4Book]){
        for (let L3Book of L4_Books_Needed_Mapping[L4Book]){
           if (updateBookQuantitiesCopyAndContinueBool(L3Book, ownedBooks, copyOfBookOwnedQuantities)) continue
          if(L3_Books_Needed_Mapping[L3Book]){
            for( let L2Book of L3_Books_Needed_Mapping[L3Book]){
               if (updateBookQuantitiesCopyAndContinueBool(L2Book, ownedBooks, copyOfBookOwnedQuantities)) continue
              if(L2_Books_Needed_Mapping[L2Book])
              for (let L1Book of L2_Books_Needed_Mapping[L2Book]){
                baseNeeds[L1Book]+=2
              }
            }
          }
        }
      }
    }
}

export const L4Calculation = function L4Calculation(
  targetBook,
  L4_Books_Needed_Mapping,
  L3_Books_Needed_Mapping,
  L2_Books_Needed_Mapping,
  copyOfBookOwnedQuantities,
  ownedBooks,
  baseNeeds
) {
  if(L4_Books_Needed_Mapping[targetBook]){
    for (let L3Book of L4_Books_Needed_Mapping[targetBook]){
       if (updateBookQuantitiesCopyAndContinueBool(L3Book, ownedBooks, copyOfBookOwnedQuantities)) continue
      if(L3_Books_Needed_Mapping[L3Book]){
        for( let L2Book of L3_Books_Needed_Mapping[L3Book]){
           if (updateBookQuantitiesCopyAndContinueBool(L2Book, ownedBooks, copyOfBookOwnedQuantities)) continue
          if(L2_Books_Needed_Mapping[L2Book])
          for (let L1Book of L2_Books_Needed_Mapping[L2Book]){
            baseNeeds[L1Book]+=2
          }
        }
      }
    }
  }
}

export const L3Calculation = function L3Calculation(
  targetBook,
  L3_Books_Needed_Mapping,
  L2_Books_Needed_Mapping,
  copyOfBookOwnedQuantities,
  ownedBooks,
  baseNeeds
) {
  if(L3_Books_Needed_Mapping[targetBook]){
    for( let L2Book of L3_Books_Needed_Mapping[targetBook]){
       if (updateBookQuantitiesCopyAndContinueBool(L2Book, ownedBooks, copyOfBookOwnedQuantities)) continue
      if(L2_Books_Needed_Mapping[L2Book])
      for (let L1Book of L2_Books_Needed_Mapping[L2Book]){
        baseNeeds[L1Book]+=2
      }
    }
  }
}

export const L2Calculation = function L2Calculation(
  targetBook,
  L2_Books_Needed_Mapping,
  baseNeeds
) {
  console.log('base in L2', baseNeeds)
  console.log('L2mappingggggg',targetBook)
  console.log(L2_Books_Needed_Mapping[targetBook])
  if(L2_Books_Needed_Mapping[targetBook])
  for (let L1Book of L2_Books_Needed_Mapping[targetBook]){
    console.log(L1Book)
    baseNeeds[L1Book]+=2
  }
  console.log('baseNeeds at end----', baseNeeds)
}

export const updateBookQuantitiesCopyAndContinueBool = function  updateBookQuantitiesCopyAndContinueBool(bookName, ownedBooks, copyOfBookOwnedQuantities){
  if(ownedBooks.includes(bookName)) {
    let indexBook = ownedBooks.indexOf(bookName)
    let quantity = copyOfBookOwnedQuantities[bookName]
    if(quantity> 0){
      copyOfBookOwnedQuantities[indexBook]-=1
      return true
    }
  }
}

export default { updateBookQuantitiesCopyAndContinueBool, L5Calculation, L4Calculation, L3Calculation, L2Calculation }