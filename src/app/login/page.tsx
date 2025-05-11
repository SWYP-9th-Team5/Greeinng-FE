'use client';

import React from 'react';

import Image from 'next/image';

import { kakaoLoginButton } from './kakaologin';

const PCLoginPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <p className="title1 text-primary mb-6">LOGIN / SIGN UP</p>
      <p className="title2 mb-10 text-[#666666]">
        간편하게 로그인 후 서비스를 사용 해 보세요
      </p>
      <div className="bg-primary flex aspect-[59/29] w-full max-w-[590px] flex-col items-center justify-center rounded-[1.25rem]">
        <button
          onClick={kakaoLoginButton}
          className="body1 relative mb-4 flex aspect-[50/5.2] w-full max-w-[500px] items-center justify-center rounded-[0.375rem] bg-[#fee500] text-[1.125rem]"
        >
          <Image
            className="absolute left-4 h-[1.125rem] w-[1.125rem]"
            src="/icons/kakao.svg"
            alt="카카오 버튼"
            width={24}
            height={24}
          />
          카카오 로그인
        </button>
        <button className="body1 relative mb-6 flex aspect-[50/5.2] w-full max-w-[500px] items-center justify-center rounded-[0.375rem] bg-[#fff] text-[1.125rem]">
          <Image
            className="absolute left-4 h-[1.125rem] w-[1.125rem]"
            src="/icons/google.svg"
            alt="구글 버튼"
            width={24}
            height={24}
          />
          구글로 로그인
        </button>
        <span className="mb-6 h-0 w-full max-w-[501px] border-t border-[#fff]"></span>

        <p className="text-text body1 text-center text-[1.125rem]">
          식물 성장 일기와 커뮤니티 댓글 및 글 작성은 로그인 후 이용가능합니다
        </p>
      </div>
    </div>
  );
};

const MBLoginPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <p className="title1 text-primary mb-6">LOGIN / SIGN UP</p>
      <p className="title2 mb-10 w-52 text-center text-[#666666]">
        간편하게 로그인 후<br />
        서비스를 사용 해 보세요
      </p>
      <div className="bg-primary flex aspect-[35/25.6] w-full max-w-[350px] flex-col items-center justify-center rounded-[1.25rem]">
        <button
          onClick={kakaoLoginButton}
          className="body1 relative mb-2 flex aspect-[30/4.5] w-full max-w-[300px] items-center justify-center rounded-[0.375rem] bg-[#fee500]"
        >
          <Image
            className="absolute left-4 h-[1.125rem] w-[1.125rem]"
            src="/icons/kakao.svg"
            alt="카카오 버튼"
            width={24}
            height={24}
          />
          카카오 로그인
        </button>
        <button className="body1 relative mb-6 flex aspect-[30/4.5] w-full max-w-[300px] items-center justify-center rounded-[0.375rem] bg-[#fff]">
          <Image
            className="absolute left-4 h-[1.125rem] w-[1.125rem]"
            src="/icons/google.svg"
            alt="구글 버튼"
            width={24}
            height={24}
          />
          구글로 로그인
        </button>
        <span className="mb-6 h-0 w-full max-w-[300px] border-t border-[#fff]"></span>
        <p className="text-text body1 max-w-[284px] text-center">
          커뮤니티 댓글 및 글 작성은
          <br />
          로그인 후 이용가능합니다
        </p>
      </div>
    </div>
  );
};

export default function Login() {
  return (
    <>
      <div className="block md:hidden">
        <MBLoginPage />
      </div>
      <div className="hidden md:block">
        <PCLoginPage />
      </div>
    </>
  );
}
