import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {employmentType, updateSalaryRange, updateEmploymentType} = props

  const onChangingSalaryRange = event => {
    updateSalaryRange(event.target.value)
  }

  const onSelectingEmploymentType = event => {
    if (event.target.checked) {
      if (employmentType.includes(event.target.value) !== true) {
        employmentType.push(event.target.value)
      }
    }
    if (event.target.checked === false) {
      const a = employmentType.indexOf(event.target.value)
      employmentType.splice(a, 1)
    }
    updateEmploymentType(employmentType)
  }

  return (
    <div>
      <hr className="horizontal-line" />
      <h1 className="filter-heading">Type of employment</h1>
      <ul className="filter-types-list">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="filter-list-item">
            <input
              id={eachType.employmentTypeId}
              type="checkbox"
              value={eachType.employmentTypeId}
              className="checkbox-input"
              onChange={onSelectingEmploymentType}
            />
            <label htmlFor={eachType.employmentTypeId} className="filter-names">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="horizontal-line" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-types-list">
        {salaryRangesList.map(eachType => (
          <li
            key={eachType.salaryRangeId}
            className="filter-list-item"
            onChange={onChangingSalaryRange}
          >
            <input
              type="radio"
              id={eachType.salaryRangeId}
              value={eachType.salaryRangeId}
              className="checkbox-input"
              name="salary"
            />
            <label htmlFor={eachType.salaryRangeId} className="filter-names">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterGroup
