<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Pusher\Pusher;
use TonchikTm\PdfToHtml\Pdf;
use Storage;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     * @throws \Pusher\PusherException
     */
    public function authenticate(Request $request)
    {
        $socketId    = $request->get('socket_id');
        $channelName = $request->get('channel_name');

        $pusher = new Pusher(
            env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), [
                                     'cluster'   => env('PUSHER_APP_CLUSTER'),
                                     'encrypted' => true,
                                 ]
        );

        $presenceData = [
            'name' => auth()->user()->name,
        ];
        $key          = $pusher->presence_auth($channelName, $socketId, auth()->user()->id, $presenceData);

        return response($key);
    }

    public function testPdf(Request $request) {
        $file = $request->file('image');
        $p = new Pdf($file, [
            'pdftohtml_path' => '/usr/bin/pdftohtml', // đường dẫn của `pdf to html` sau khi cài đặt
            'pdfinfo_path' => '/usr/bin/pdfinfo', // đường dẫn của `pdf info` sau khi cài đặt
            'clearAfter' => false, // xóa file pdf sau khi convert - mặc định là true
            'outputDir' => storage_path('app/ebooks'), // thư mục output của file html
        ]);
//        $text = $p->getHtml()->getPage(1);
        $sendText = '';
        // 個人情報削除用正規表現
        $telPatterm1 = '/\d{9,11}/';
        $telPatterm2 = '/\d{2}\-\d{4}\-\d{4}/';
        $telPatterm3 = '/\d{3}\-\d{3}\-\d{4}/';
        $telPatterm4 = '/\d{2}(\s|\xC2\xA0)+\d{2,4}(\s|\xC2\xA0)+\d{3,4}(\s|\xC2\xA0)+\d{3,4}/';
        $telPatterm5 = '/\d{2,4}(\s|\xC2\xA0)+\d{3,4}(\s|\xC2\xA0)+\d{3,4}/';
        $emailPatterm = '/(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\"[^\\\\\x80-\xff\n\015\"]*(?:\\\\[^\x80-\xff][^\\\\\x80-\xff\n\015\"]*)*\")(?:\.(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\"[^\\\\\x80-\xff\n\015\"]*(?:\\\\[^\x80-\xff][^\\\\\x80-\xff\n\015\"]*)*\"))*@(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\[(?:[^\\\\\x80-\xff\n\015\[\]]|\\\\[^\x80-\xff])*\])(?:\.(?:[^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff]+(?![^(\040)<>@,;:\".\\\\\[\]\000-\037\x80-\xff])|\[(?:[^\\\\\x80-\xff\n\015\[\]]|\\\\[^\x80-\xff])*\]))*/';
        $homePagePatterm1 =
            '`\bhttps?+:(?://(?:(?:[-.0-9_a-z~]|%[0-9a-f][0-9a-f]' .
            '|[!$&-,:;=])*+@)?+(?:\[(?:(?:[0-9a-f]{1,4}:){6}(?:' .
            '[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:\d|[1-9]\d|1\d{2}|2' .
            '[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25' .
            '[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?' .
            ':\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|::(?:[0-9a-f' .
            ']{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:\d|[1' .
            '-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{' .
            '2}|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\\' .
            'd|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])' .
            ')|(?:[0-9a-f]{1,4})?+::(?:[0-9a-f]{1,4}:){4}(?:[0-' .
            '9a-f]{1,4}:[0-9a-f]{1,4}|(?:\d|[1-9]\d|1\d{2}|2[0-' .
            '4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-' .
            '5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?:\d' .
            '|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|(?:(?:[0-9a-f]{' .
            '1,4}:)?+[0-9a-f]{1,4})?+::(?:[0-9a-f]{1,4}:){3}(?:' .
            '[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:\d|[1-9]\d|1\d{2}|2' .
            '[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25' .
            '[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?' .
            ':\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|(?:(?:[0-9a-' .
            'f]{1,4}:){0,2}[0-9a-f]{1,4})?+::(?:[0-9a-f]{1,4}:)' .
            '{2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:\d|[1-9]\d|1\\' .
            'd{2}|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4' .
            ']\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5' .
            '])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|(?:(?:' .
            '[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?+::[0-9a-f]{1,4' .
            '}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:\d|[1-9]\d|1\d' .
            '{2}|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]' .
            '\d|25[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]' .
            ')\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))|(?:(?:[' .
            '0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?+::(?:[0-9a-f]{1' .
            ',4}:[0-9a-f]{1,4}|(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25' .
            '[0-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?' .
            ':\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\\' .
            'd|1\d{2}|2[0-4]\d|25[0-5]))|(?:(?:[0-9a-f]{1,4}:){' .
            '0,5}[0-9a-f]{1,4})?+::[0-9a-f]{1,4}|(?:(?:[0-9a-f]' .
            '{1,4}:){0,6}[0-9a-f]{1,4})?+::|v[0-9a-f]++\.[!$&-.' .
            '0-;=_a-z~]++)\]|(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0' .
            '-5])\.(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?:\\' .
            'd|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(?:\d|[1-9]\d|' .
            '1\d{2}|2[0-4]\d|25[0-5])|(?:[-.0-9_a-z~]|%[0-9a-f]' .
            '[0-9a-f]|[!$&-,;=])*+)(?::\d*+)?+(?:/(?:[-.0-9_a-z' .
            '~]|%[0-9a-f][0-9a-f]|[!$&-,:;=@])*+)*+|/(?:(?:[-.0' .
            '-9_a-z~]|%[0-9a-f][0-9a-f]|[!$&-,:;=@])++(?:/(?:[-' .
            '.0-9_a-z~]|%[0-9a-f][0-9a-f]|[!$&-,:;=@])*+)*+)?+|' .
            '(?:[-.0-9_a-z~]|%[0-9a-f][0-9a-f]|[!$&-,:;=@])++(?' .
            ':/(?:[-.0-9_a-z~]|%[0-9a-f][0-9a-f]|[!$&-,:;=@])*+' .
            ')*+)?+(?:\?+(?:[-.0-9_a-z~]|%[0-9a-f][0-9a-f]|[!$&' .
            '-,/:;=?+@])*+)?+(?:#(?:[-.0-9_a-z~]|%[0-9a-f][0-9a' .
            '-f]|[!$&-,/:;=?+@])*+)?+`i'
        ;
//        $homePagePatterm2 = '/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i'; //wwwから始まるURLを摘出する正規表現（元祖）
        $homePagePatterm2 = '/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+(?:\/[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i'; //wwwから始まるURLを摘出する正規表現（改良版）

        foreach ($p->getHtml()->getAllPages() as $text) {
            $text = preg_replace($emailPatterm , '************' , $text);
            $text = preg_replace($telPatterm1, '***********', $text);
            $text = preg_replace($telPatterm2, '***********', $text);
            $text = preg_replace($telPatterm3, '***********', $text);
            $text = preg_replace($telPatterm4, '***********', $text);
            $text = preg_replace($telPatterm5, '***********', $text);
            $text = preg_replace($homePagePatterm1, '***********', $text);
            $text = preg_replace($homePagePatterm2, '***********', $text);
//            Storage::disk('s3')->put('pdftest/user/test' . $i . '.html', $text, 'public');
            $sendText .= $text. '<br>';
        }
        Storage::disk('s3')->put('pdftest/user/test.html', $sendText, 'public');
//        $myfile = fopen(storage_path('app/ebooks').'/monmonmon.html', 'w');
//        fwrite($myfile, $text);
//        fclose($myfile);
        return response()->json([
            'test' => str_replace('0333087259', '', $text),
            'moto' => $text,
        ]);
    }
}
