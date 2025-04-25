import Button from '@components/common/Button';

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button color="primary">테스트 다시하기</Button>
        <Button color="secondary">버튼</Button>
        <Button color="point">버튼</Button>
      </div>
      <div>
        <Button size="md" color="primary">
          테스트 다시하기
        </Button>
        <Button size="md" color="secondary">
          버튼
        </Button>
        <Button size="md" color="point">
          버튼
        </Button>
        <Button size="md" color="gray">
          버튼
        </Button>
      </div>
      <div>
        <Button size="sm" color="primary">
          테스트 다시하기
        </Button>
        <Button size="sm" color="secondary">
          버튼
        </Button>
        <Button size="sm" color="point">
          버튼
        </Button>
      </div>
    </div>
  );
}
