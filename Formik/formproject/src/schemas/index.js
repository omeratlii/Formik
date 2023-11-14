import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// yup kullanarak validation işlemlerini yapıyoruz.
// componentler ile aynı valueslara sahip olmalı.
// tek tek neleri kontrol edeceğimizi giriyoruz.
export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email girmek zorunludur"),

  age: yup
    .number()
    .positive("Lütfen pozitif bir yaş giriniz")
    .integer("Lütfen yaşınızı tam sayı olarak giriniz")
    .required("Yaş girmek zorunludur"),
  password: yup
    .string()
    .min(5, "Minimum 5 karakter giriniz")
    .matches(passwordRules, {
      message: "Lütfen en az 1 büyük harf, 1 küçük harf ve 1 sayı giriniz",
    })
    .required("Şifre girmek zorunludur"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre girmek zorunludur"),
});

// string ve number ise value'nun hangi değerde olması gerektiğini belirtmek için kullandık.

// matches: en yukarıda regex formatında oluşturduğumuz şifreye uysun diye kullandık.

// required: zorunlu, boş geçilemez olması için kullandık.

// oneOf: şifreler örtüşüyor mu diye kontrol etmek için kullandık. ref diyerek password'deki özelliklerin aynısını istedik ve eğer şartar karşılanmıyorsa
// virgülden sonra ne yazacağını belirttik. Yani virgülden sonra hata mesajını verdik.

// PortalForm için yapılan schema
export const advancedSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Kullanıcı adı minimum 3 karakter uzunluğunda olmalıdır")
    .required("Kullanıcı adı zorunludur"),

  university: yup
    .string()
    .oneOf(["bogazici", "odtü", "itü", "koc"], "Lütfen üniversitenizi seçiniz")
    .required("Lütfen üniversitenizi seçiniz"),
  isAccepted: yup
    .boolean()
    .oneOf([true], "Kullanım koşullarını kabul ediniz")
    .required("Şifre girmek zorunludur"),
});
