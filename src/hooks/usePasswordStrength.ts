import {LinearProgressProps} from '@mui/material';
import {useEffect, useState} from "react";

type PasswordStrengthValidatorType = {
  strength: number;
  password: string;
  level: Array<'level1' | 'level2' | 'level3' | 'level4' | 'level5'>;
  calcStrength(password: string): PasswordStrengthValidatorType;
  getColor(): LinearProgressProps['color'];
  getMessage(): string;
  getResult(): number;
};

const PasswordStrengthValidator: PasswordStrengthValidatorType = {
  strength: 0,
  level: [],
  password: '',
  calcStrength(password: string) {
    this.strength = 0;
    this.level = [];
    this.password = password;

    if (password.match(/[a-z]+/)) {
      if (this.level.indexOf('level1') === -1) {
        this.level.push('level1');
      }
      this.strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      if (this.level.indexOf('level2') === -1) {
        this.level.push('level2');
      }
      this.strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      if (this.level.indexOf('level3') === -1) {
        this.level.push('level3');
      }
      this.strength += 2;
    }
    if (password.match(/[$@#&!]+/)) {
      if (this.level.indexOf('level4') === -1) {
        this.level.push('level4');
      }
      this.strength += 3;
    }


    return this;
  },
  getResult() {
    // console.log(this);

    if (this.password.length < 8) return 2 + this.password.length;

    if (this.strength > 99) return this.strength

    if (this.level.length === 4 && this.password.length > 10) return 100

    const result = (this.strength / 2 * this.level.length * 10) + this.password.length;
    if (result > 100) return 100;
    return result;
  },
  getColor() {
    if (this.getResult() < 10) return 'error';
    if (this.getResult() < 30) return 'warning';
    if (this.getResult() < 70) return 'info';
    if (this.getResult() >= 70) return 'success';
    return 'error';
  },
  getMessage() {
    if (this.getResult() < 10) return 'Too Week';
    if (this.getResult() < 30) return 'Could Be Stronger';
    if (this.getResult() < 70) return 'Could Be Stronger';
    if (this.getResult() >= 70) return 'Strong Password';
    return 'Too Week';
  }
}

type UsePasswordStrengthType = {
  strength: number;
  color: LinearProgressProps['color'];
  message: string;
}

export const usePasswordStrength = (password: string): UsePasswordStrengthType => {
  const [strength, setStrength] = useState(0);
  const [color, setColor] = useState<LinearProgressProps['color']>('error');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStrength(PasswordStrengthValidator.calcStrength(password).getResult());
    setColor(PasswordStrengthValidator.calcStrength(password).getColor());
    setMessage(PasswordStrengthValidator.calcStrength(password).getMessage());
  }, [password]);

  // console.log(strength, color, message)


  return {strength, color, message};
}
