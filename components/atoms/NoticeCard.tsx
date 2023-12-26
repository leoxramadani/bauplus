import { Presentation } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface Notice {
  noticeId: string;
  dateCreated: string;
  noticeTitle: string;
  noticeText: string;
  isRead: boolean;
  employeeId: string;
  companyId: string;
  employee: {
    employeeName: string;
    employeePosition: string;
  } | null;
}

interface NoticeCardProps {
  noticeData?: Notice;
  noticesRefetch?: () => void;
}

const NoticeCard = ({
  noticeData,
  noticesRefetch,
}: NoticeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex items-center justify-start gap-1 ">
          <Avatar className="flex h-6 w-6 items-center justify-center bg-red-200">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <p className="text-normal">
            {noticeData?.employee?.employeeName || 'Besir Kurtishi'}
          </p>
        </div>
        <Badge
          variant={'destructive'}
          className="mb-2 flex w-max items-center justify-center gap-1"
        >
          {/* <CandyCane size={14} /> Holiday Announcement */}
          {/* <Briefcase size={14} /> Company Announcement */}
          <Presentation size={14} /> Urgent Meeting
        </Badge>

        <CardTitle>Notice</CardTitle>
        <CardDescription className="">
          {noticeData?.noticeTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{noticeData?.noticeText}</CardDescription>
        {/* <p>Card Content</p> */}
      </CardContent>
      <CardFooter className="flex"></CardFooter>
    </Card>
  );
};

export default NoticeCard;
