import React from 'react'
import style from '../../../Styles/signup/SingupFooter.module.css'

export default function SingupFooter() {
  return (
    <footer className={style.footer}>
        <div>
          <h3>Questions? Call 000-800-919-1694</h3>
          <ul>
            <li>FAQ</li>
            <li>Help Centre</li>
            <li>Netflix Shop</li>
            <li>Terms to Use</li>
            <li>Privacy</li>
            <li>Cookie Preferences</li>
            <li>Corporate Information</li>
          </ul>

          <div className={style.LanguageSelecter}>
            <span>&#127760;</span>
            <select>
              <option>English</option>
              <option>हिन्दी</option>
            </select>
          </div>

        </div>
      </footer>
  )
}
