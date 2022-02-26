const _data: Array<number> = process.argv.slice(2, 8).map(function (item) {
  return parseInt(item, 10)
})
const _targetData: number = Number(process.argv[9])

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (data: Array<number>, tagetData: number): Result => {
  const periodLength: number = data.length
  const trainingDays: number = data.filter((d) => d > 0).length
  const average: number = data.reduce((a: number, b: number) => a + b, 0) / 7
  const target: number = tagetData
  const success: boolean = average > target ? true : false
  const rating: number = setRating(target, average)
  const ratingDescription: string = setRatingDescription(rating)

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

const setRating = (target: number, average: number): number => {
  let result: number = target / average
  switch (true) {
    case result < 1:
      return 3
    case result > 1:
      return 2
    default:
      return 1
  }
}

const setRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'bad'
    case 2:
      return 'not too bad but could be better'
    case 3:
      return 'nice'
    default:
      throw new Error('Something is wrong')
  }
}

console.log(calculateExercises(_data, _targetData))
