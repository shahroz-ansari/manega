import styles from '@/styles/App.module.css'

export default function MSAAdd() {
  return (
    <>
      <header>Add New MSA</header>

      <div className='formFieldWrapper'>
        <label>
          From:
          <input type="month" />
        </label>
      </div>
      <div className='formFieldWrapper'>
        <label>
          To:
          <input type="month" />
        </label>
      </div>

      <button>Submit</button>
    </>
  )
}
