require("dotenv").config();
const DAO = require('../DAO/index')
const Models = require('../models/index')
const lodash = require('lodash');

const response_messages = async () => {
      try {

            let data_to_push = [
                  {
                        type: 'ERROR',
                        message_type: 'UNAUTHORIZED',
                        msg_in_english: 'you are not authorized to perform this action.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'Account Already Exists',
                        msg_in_english: `Welcome back! It looks like you already have an account with us. Please sign-in to enjoy exclusive pre-
                      launch offers, or try another email to create new account.`,
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'USERNAME_ALREADY_EXISTS',
                        msg_in_english: 'This username  alreday exists. Please try again.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'ACCOUNT_BLOCKED',
                        msg_in_english: 'Sorry this account is temporary blocked.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'SIGNUP_OR_LOGIN_VIA_SOCIAL_LOGIN',
                        msg_in_english: 'Please signUp or login via social login',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'ACCOUNT_DEACTIVATED',
                        msg_in_english: 'Sorry this account is temporary deactivated.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'ACCOUNT_DELETED',
                        msg_in_english: 'Sorry this account is temporary deleted.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'INCORRECT_PASSWORD',
                        msg_in_english: 'This password is incorrect. Please try again.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'NO_DATA_FOUND',
                        msg_in_english: 'No data found.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'INVALID_OBJECT_ID',
                        msg_in_english: 'Sorry this is not a valid object _id.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'PHONE_NO_ALREADY_EXISTS',
                        msg_in_english: 'This phone number alreday exists Please try again.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'WRONG_OTP',
                        msg_in_english: `The OTP entered is incorrect. Please double-check and try again. If you continue to face
                      issues, you can request a new OTP or change your email address`,
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'NEWSLETTER_ALREADY_SUSBCRIBED',
                        msg_in_english: 'Newsletter is already susbcribe with this email. Please try with another email.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'LOGIN_VIA_GOOGLE',
                        msg_in_english: 'This email address already exists. Please try again with gmail login',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'LOGIN_VIA_FACEBOOK',
                        msg_in_english: 'This email address already exists. Please try again with facebook login',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'LOGIN_VIA_APPLE',
                        msg_in_english: 'This email address already exists. Please try again with apple login',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'LOGIN_VIA_EMAIL_PASSWORD',
                        msg_in_english: 'This email address already exists. Please try again with email and password',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'EMAIL_NOT_REGISTERED',
                        msg_in_english: 'The email address provided is not registered with us',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'OLD_PASSWORD_MISMATCH',
                        msg_in_english: 'Sorry old password is incorrect please try again',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'BACKUP_UPLOAD_FAILED',
                        msg_in_english: 'Sorry db backup upload failed',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'INSUFFICIENT_PERMISSIONS',
                        msg_in_english: 'Sorry you are not having sufficient permission to perform this action',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'INVALID_CURRENCY_COUNTRY_OR_ACTIVITIES',
                        msg_in_english: 'Please enter the valid things',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'INVALID_USERNAME_PASSWORD',
                        msg_in_english: 'Please check your username and password',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'USER_DOES_NOT_EXIST',
                        msg_in_english: 'Requested User Id does not exists',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'PHONE_NUMBER_NOT_REGISTERED',
                        msg_in_english: 'The phone number provided is not registered with us',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'NEW_PASSWORD_SAME_AS_OLD',
                        msg_in_english: 'Your new password is same as old password. Please try with another one',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'NEW_USERNAME_SAME_AS_OLD',
                        msg_in_english: 'Your new username is same as old username. Please try with another one',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'USER_NOT_SUBSCRIBED_WITH_THIS_EMAIL',
                        msg_in_english: 'Please subscribe first. Then try again',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'SECURITY_CODE_EXPIRED',
                        msg_in_english: 'This reset password link is expired. Please try again.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'OTP_EXPIRED',
                        msg_in_english: `Your OTP has expired. Please request a new OTP to proceed. If you're encountering
                      issues, consider changing your email address.`,
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'ALL_FIELD_MANDATORY',
                        msg_in_english: `All field is mandatory.`,
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'NOT_MATCH_PASSWORD_CONFIRM_PASSWORD',
                        msg_in_english: `New Password and Confirm Password must be the same.`,
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'Token_EXPIRED',
                        msg_in_english: `Your Token has expired.`,
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'EMAIL_ALREADY_EXISTS',
                        msg_in_english: 'This Email already exists Please try another Email.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'DATA_NOT_UPDATE',
                        msg_in_english: 'Details is not updated.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'FILE_NOT_UPLOAD',
                        msg_in_english: 'No file was uploaded.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'DATA_NOT_SAVE',
                        msg_in_english: 'Oops Somthing went wrong. Please try again later.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'CLASS_ALREADY_EXISTS',
                        msg_in_english: 'Class already exists. Please try again.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'ARCHIVE_ERROR_SCHOOL_ADMIN',
                        msg_in_english: "Oops your account is archived.You don't have login access.Please connect with Super Admin!",
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'ARCHIVE_ERROR',
                        msg_in_english: "Oops your account is archived.You don't have login access.Please connect with School Admin!",
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'WRONG_ANSWER',
                        msg_in_english: 'Opps! This is wrong answer.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'DATA_ALREADY_EXISTS',
                        msg_in_english: 'This Data already exists.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },
                  {
                        type: 'ERROR',
                        message_type: 'NAME_ALREADY_EXISTS',
                        msg_in_english: 'This name already exists.',
                        status: false,
                        code: 400,
                        created_at: +new Date()
                  },



            ]

            return data_to_push

      }
      catch (err) {
            throw err;
      }
}

const error_res_msgs = async () => {
      try {

            // console.log("<--bootstrap_res_msgs-->")

            let query = {}
            let projection = { __v: 0 }
            let options = { lean: true }
            let fetch_data = await DAO.getData(Models.ResMessages, query, projection, options);

            if (fetch_data.length) {

                  let data_to_push = await response_messages()
                  let filter_data = lodash.xorBy(fetch_data, data_to_push, 'message_type')

                  if (filter_data.length > 0) {
                        let options = { multi: true }
                        await DAO.insertMany(Models.ResMessages, filter_data, options);
                  }

            } else {

                  let data_to_push = await response_messages()
                  let options = { multi: true }
                  await DAO.insertMany(Models.ResMessages, data_to_push, options);

            }


      }
      catch (err) {
            throw err;
      }
}

const errorFile_data = async () => {
      try {
            await error_res_msgs()

      }
      catch (err) {
            throw err;
      }
}

module.exports = errorFile_data
