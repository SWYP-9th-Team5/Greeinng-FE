import React from 'react';

import GoogleIcon from '../../assets/icons/google.svg';
import KakaoIcon from '../../assets/icons/kakao.svg';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="title1 text-primary mb-6">LOGIN / SIGN UP</p>
      <p className="title2 mb-10 text-[#666666]">
        간편하게 로그인 후 서비스를 사용 해 보세요
      </p>
      <div className="bg-primary flex aspect-[59/29] w-full max-w-[590px] flex-col items-center justify-center rounded-[1.25rem]">
        <button className="relative mb-4 flex aspect-[50/5.2] w-full max-w-[500px] items-center justify-center rounded-[0.375rem] bg-[#fee500]">
          <KakaoIcon className="absolute left-4 h-[1.125rem] w-[1.125rem]" />
          카카오 로그인
        </button>
        <button className="relative mb-6 flex aspect-[50/5.2] w-full max-w-[500px] items-center justify-center rounded-[0.375rem] bg-[#fff]">
          <GoogleIcon className="absolute left-4 h-[1.125rem] w-[1.125rem]" />
          구글로 로그인
        </button>
        <span className="mb-6 h-0 w-full max-w-[501px] border-t border-[#fff]"></span>
        <p className="text-text body1 max-w-[330px] text-center text-[1.125rem]">
          식물 성장 일기와 커뮤니티 댓글 및 글 작성은 로그인 후 이용가능합니다
        </p>
      </div>
    </div>
  );
}
