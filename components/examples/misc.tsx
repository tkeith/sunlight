const btnClasses = `
  px-6
  py-2.5
  bg-blue-600
  text-white
  font-medium
  text-xs
  leading-tight
  uppercase
  rounded
  shadow-md
  hover:bg-blue-700 hover:shadow-lg
  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
  active:bg-blue-800 active:shadow-lg
  transition
  duration-150
  ease-in-out`

export function TextButton({ children, ...otherProps }: { children: React.ReactNode, [key: string]: any }) {
  return <div className="my-2"><button {...otherProps} className={btnClasses}>{children}</button></div>
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return <div className="my-2"><button type='submit' className={btnClasses}>{children}</button></div>
}

export function TextInput({ label, helpText, name, ...otherProps }: { label?: string, helpText?: string, name: string, [key: string]: any }) {
  return <div className="my-2">
    {label && <label htmlFor={name} className="inline-block mb-2 ml-10text-gray-700">{label}</label>}
    <input type="text" name={name} className="
          block
          w-1/8
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700
          focus:bg-white
          focus:border-blue-600
          focus:outline-none
          " aria-describedby="textHelp" {...otherProps} />
    {helpText && <small id="textHelp" className="block mt-1 text-xs text-gray-600">{helpText}</small>}
  </div>
}
