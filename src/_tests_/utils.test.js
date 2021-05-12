import { groupBy, getFields, capitaliseString } from '../data/utils'

const recordsData = [
  {
    'Property1': 'Value1'
  }, {
    'Property2': 'Value2'
  }
]

const groupOneData = {
  "Value1": [
    {
      'Property1': 'Value1'
    }
  ]
}
const groupTwoData = {
  "Value2": [
    {
      'Property2': 'Value2'
    }
  ]
}

const fieldsData = [
  {
      "id": "_id",
      "type": "int"
  },
  {
      "id": "Field title",
      "type": "text"
  }
]

const getFieldsResult = ['ID', 'Field title']

const testString = 'SOMETHING CAPITALISED'
const capitalisedString = 'Something capitalised'

describe('groupBy utility function', () => {
  test('returns expected output', () => {
    const groupOne = groupBy('Property1')
    expect(groupOne(recordsData)).toMatchObject(
      groupOneData
    )

    const groupTwo = groupBy('Property2')
    expect(groupTwo(recordsData)).toMatchObject(
      groupTwoData
    )
  })
})

describe('getFields utility function', () => {
  test('returns expected output', () => {
    expect(getFields(fieldsData, 'id')).toMatchObject(
      getFieldsResult
    )
  })
})

describe('capitaliseString utility function', () => {
  test('returns expected output', () => {
    expect(capitaliseString(testString)).toEqual(capitalisedString)
  })
})