import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Download, FileText, ExternalLink, Image as ImageIcon, RefreshCw, AlertCircle, Maximize2 } from 'lucide-react';
import { api } from '../services/api';
import { Notice } from '../types';

export const NoticeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [fileFormat, setFileFormat] = useState<'image' | 'pdf'>('image');
  const [loadError, setLoadError] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  const getNoticeProxyUrl = (noticeId: string | undefined, ext: 'jpg' | 'pdf') => {
    if (!noticeId) return '';
    const remote = `http://sib.gov.bd/notice_board/127372${noticeId}.${ext}`;
    return `/api/notices/file?url=${encodeURIComponent(remote)}`;
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      setLoadError(false);
      setHasTriedFallback(false);

      api.getNoticeById(id).then((data) => {
        setNotice(data);
        const resolvedUrl = data?.fileUrl || data?.attachmentUrl;
        if (resolvedUrl) {
          const isPdf = data?.fileType === 'pdf' || resolvedUrl.toLowerCase().includes('.pdf');
          setFileFormat(isPdf ? 'pdf' : 'image');
          setCurrentUrl(resolvedUrl);
        } else {
          // Default to edge proxy
          setCurrentUrl(getNoticeProxyUrl(id, 'jpg'));
          setFileFormat('image');
        }
        setLoading(false);
      });
    }
  }, [id]);

  // Pre-validate file availability and detect content-type via HEAD check
  useEffect(() => {
    if (!currentUrl) return;

    let active = true;
    fetch(currentUrl, { method: 'HEAD' })
      .then((res) => {
        if (!active) return;
        if (!res.ok) {
          setLoadError(true);
        } else {
          setLoadError(false);
          const ct = (res.headers.get('content-type') || '').toLowerCase();
          if (ct.includes('application/pdf')) {
            setFileFormat('pdf');
          } else if (ct.startsWith('image/')) {
            setFileFormat('image');
          }
        }
      })
      .catch(() => {
        // Fallback to media element error handlers
      });

    return () => {
      active = false;
    };
  }, [currentUrl]);

  const handleFormatToggle = (newFormat: 'image' | 'pdf') => {
    setFileFormat(newFormat);
    setLoadError(false);
    if (id) {
      setCurrentUrl(getNoticeProxyUrl(id, newFormat === 'image' ? 'jpg' : 'pdf'));
    }
  };

  const handleImageError = () => {
    // If JPG failed and we haven't tried PDF yet, try PDF
    if (!hasTriedFallback && id) {
      setHasTriedFallback(true);
      setFileFormat('pdf');
      setCurrentUrl(getNoticeProxyUrl(id, 'pdf'));
    } else {
      setLoadError(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-sm text-slate-600">
        <RefreshCw className="w-6 h-6 animate-spin text-institutional-navy mx-auto mb-2" />
        বিজ্ঞপ্তির বিস্তারিত তথ্য লোড হচ্ছে...
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">বিজ্ঞপ্তিটি পাওয়া যায়নি</h2>
        <Link to="/notices" className="text-sm font-semibold text-institutional-navy hover:underline">
          &larr; নোটিশ বোর্ডে ফিরে যান
        </Link>
      </div>
    );
  }

  const fileName = currentUrl.split('/').pop() || `notice_${id}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back Button */}
      <Link
        to="/notices"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-institutional-navy hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>সকল নোটিশ তালিকায় ফিরে যান</span>
      </Link>

      {/* Main Notice Document Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Header */}
        <div className="border-b border-slate-200 pb-5 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="px-2.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 text-xs font-semibold font-mono">
              নোটিশ নং #{notice.id}
            </span>

            {/* Format Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md text-xs">
              <button
                onClick={() => handleFormatToggle('image')}
                className={`px-2.5 py-1 rounded-sm flex items-center gap-1 transition-all ${
                  fileFormat === 'image'
                    ? 'bg-white text-institutional-navy font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>ছবি ফরম্যাট</span>
              </button>
              <button
                onClick={() => handleFormatToggle('pdf')}
                className={`px-2.5 py-1 rounded-sm flex items-center gap-1 transition-all ${
                  fileFormat === 'pdf'
                    ? 'bg-white text-institutional-navy font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>পিডিএফ ফরম্যাট</span>
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-snug">
            {notice.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
            {notice.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>তারিখ: {notice.date}</span>
              </div>
            )}
            {notice.lastUpdate && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>হালনাগাদ: {notice.lastUpdate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notice Description Body if any */}
        {notice.description && (
          <div className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-5 rounded-lg border border-slate-100">
            {notice.description}
          </div>
        )}

        {/* Document Action Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-50 border border-slate-200 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            {fileFormat === 'pdf' ? (
              <FileText className="w-6 h-6 text-rose-700 shrink-0" />
            ) : (
              <ImageIcon className="w-6 h-6 text-institutional-navy shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold text-slate-900">
                সংযুক্ত দাপ্তরিক নথি ({fileFormat === 'pdf' ? 'পিডিএফ নথি' : 'স্ক্যান করা কপি'})
              </div>
              <div className="text-[11px] text-slate-500 font-mono break-all">
                {fileName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              নতুন ট্যাবে খুলুন
            </a>
            <a
              href={currentUrl}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-md bg-institutional-navy hover:bg-institutional-navyDark text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              ডাউনলোড
            </a>
          </div>
        </div>

        {/* Document Viewer Container */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-100 min-h-[400px] flex items-center justify-center p-2 sm:p-4">
          {loadError ? (
            /* Graceful Error Card */
            <div className="text-center p-8 max-w-md space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">
                সংযুক্ত নথিটি পাওয়া যায়নি
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                বিদ্যালয়ের পুরোনো আর্কাইভ সার্ভারে এই বিজ্ঞপ্তির মূল স্ক্যান ফাইলটি সংরক্ষিত নেই (পুরোনো বিজ্ঞপ্তি হওয়ায় সার্ভার থেকে অপসারিত হয়ে থাকতে পারে)। তবে বিজ্ঞপ্তির শিরোনাম ও তথ্যাদি উপরে দৃশ্যমান রয়েছে।
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setLoadError(false);
                    handleFormatToggle(fileFormat === 'image' ? 'pdf' : 'image');
                  }}
                  className="px-3 py-1.5 rounded-md bg-institutional-navy text-white text-xs font-medium hover:bg-institutional-navyDark transition-colors"
                >
                  {fileFormat === 'image' ? 'পিডিএফ ফরম্যাটে চেষ্টা করুন' : 'ছবি ফরম্যাটে চেষ্টা করুন'}
                </button>
              </div>
            </div>
          ) : fileFormat === 'image' ? (
            /* Image Document Viewer */
            <div className="w-full text-center">
              <img
                src={currentUrl}
                alt={notice.title}
                onError={handleImageError}
                className="max-w-full max-h-[85vh] object-contain mx-auto shadow-md rounded-md bg-white border border-slate-200"
              />
            </div>
          ) : (
            /* PDF Document Viewer */
            <div className="w-full">
              <iframe
                src={`${currentUrl}#toolbar=0`}
                title={notice.title}
                className="w-full h-[700px] border-none rounded-md bg-white"
                onError={() => {
                  if (!hasTriedFallback) {
                    setHasTriedFallback(true);
                    setFileFormat('image');
                    setCurrentUrl(getNoticeProxyUrl(id, 'jpg'));
                  } else {
                    setLoadError(true);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
