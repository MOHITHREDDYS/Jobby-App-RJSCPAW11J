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
  const {salaryType, employmentType} = props

  return (
    <div>
      <hr className="horizontal-line" />
      <p className="filter-heading">Type of employment</p>
      <ul className="filter-types-list">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="filter-list-item">
            <input
              type="checkbox"
              value={eachType.employmentTypeId}
              className="checkbox-input"
            />
            <label className="filter-names">{eachType.label}</label>
          </li>
        ))}
      </ul>
      <hr className="horizontal-line" />
      <p className="filter-heading">Salary Range</p>
      <ul className="filter-types-list">
        {salaryRangesList.map(eachType => (
          <li key={eachType.salaryRangeId} className="filter-list-item">
            <input
              type="radio"
              value={eachType.salaryRangeId}
              className="checkbox-input"
              name="salary"
            />
            <label className="filter-names">{eachType.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterGroup
