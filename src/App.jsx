import React, { useEffect, useState } from 'react'

import settings from './config.json';
import Dashboard from './components/Dashboard';
import { getBookInfo, getDiscountRequest, isDev } from './api/api';
import { Portal } from '@mui/material';
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { routes } from './routes';
import get from 'lodash/get';

import { useFlat } from './contexts/FlatContext/useFlat';
import { useDiscount } from './contexts/DiscountContext/useDiscount';
import { isSavedDataExist, saveData } from './hooks/useLocalSavedData';
import useEventListener from './hooks/useEventListener';

import DiscountRequestPending from './pages/DiscountRequestPending';
import DiscountRequestSuccess from './pages/DiscountRequestSuccess';
import DiscountRequestFail from './pages/DiscountRequestFail';
import DiscountRequestRepeat from './pages/DiscountRequestRepeat';
import DiscountRequestFilling from './pages/DiscountRequestFilling';
import BookingRequestFill from './pages/BookingRequestFill';
import AboutBooking from './pages/AboutBooking';
import OffertaAgreement from './pages/OffertaAgreement';
import BookingAfterPayment from './pages/BookingAfterPayment';
import DiscountRequestRepeatDialog from './pages/DiscountRequestRepeatDialog';

import ButtonLarge from './components/buttons/ButtonLarge';
import ButtonQuestion from './components/buttons/ButtonQuestion';
import useConfig from './hooks/useConfig';
import { useLocalHistory } from './contexts/LocalHistory/useLocalHistory';
import { BrowserView } from 'react-device-detect';

function App() {

  const { DISABLE_DISCOUNT } = useConfig();
  
  const { flatInfo, setFlatInfo, clearRequestedFlatInfoWithDiscount } = useFlat();
  const [flatId, setFlatId] = useState(null);

  const localHistory = useLocalHistory();

  const checkIsDiscountRequestExist = () => {
    if (!isSavedDataExist()) return undefined;
    return routes.stage_discount_request_repeat_dialog.replace(':flatId', flatId);
  }
  const [ lastVisitedPage, setLastVisitedPage ] = useState(checkIsDiscountRequestExist());

  const [ userData, setUserData ] = useState(settings.form);

  const { discountInfo, setDiscountInfo } = useDiscount();


  const navigate = useNavigate();

  useEventListener('historyUpdated', () => {
    let params = new URLSearchParams(window.location.search);
    let page = params.get('type');
    let flatId = params.get('id');

    if (page !== 'flat') {
      setFlatId(null); 
      setLastVisitedPage(null);
      clearRequestedFlatInfoWithDiscount();
      return;
    }
    setLastVisitedPage(checkIsDiscountRequestExist());
    setFlatId(flatId);  
    if (!window.location.hash) {
      navigate(routes.stage_flat.replace(':flatId', flatId));
    }
  });

  useEffect(() => {
    if (!flatId) return setFlatInfo(undefined);

    getBookInfo(flatId)
      .then(({data}) => {
        if (data.code == 404) return setFlatInfo(undefined);
        setTimeout(() => {
          setFlatInfo(data.data.data);
        }, 1000);
      })
  }, [ flatId ]);

  const requestDiscount = (values) => {

    const cloned = [...userData];
    cloned.forEach((el) => {
      if (values[el.name]) {
        el.value = values[el.name];
      }
    });

    const dataForRequest = {
      ...userData.reduce((acc, el) => {
        acc[el.name] = el.value;
        return acc;
      }, {}),
      discount_value: get(discountInfo, 'requested_discount', 0),
      flat_id: flatId,
    };
    setUserData(cloned);
    navigate(routes.stage_discount_request_pending.replace(':flatId', flatId));
    getDiscountRequest(dataForRequest)
      .then(response => {
        if (response.data.code !== 200) {
          alert('Error');
          navigate(routes.stage_flat.replace(':flatId', flatId));
          return;
        }

        setDiscountInfo({
          ...response.data.data.data,
          requested_discount: 10
        });

        saveData(userData, {
          ...response.data.data.data,
          requested_discount: 10
        });


        const answer = get(response, 'data.data.data.answer', false);
        let nextRoute = '';

        switch (answer) {
          case 'yes':
            nextRoute = routes.stage_discount_request_response_success.replace(':flatId', flatId);
            break;
          case 'no':
            nextRoute = routes.stage_discount_request_response_fail.replace(':flatId', flatId);
            break;
          case 'repeat':
            nextRoute = routes.stage_discount_request_response_repeat.replace(':flatId', flatId)
            break;
        
          default:
            break;
        }

        navigate(nextRoute);
        setLastVisitedPage(nextRoute);

      });
  };

  const isRenderDashBoard = flatInfo && flatInfo.status == '1';

  if (!flatInfo) return null;

  return (
    <>
      <BrowserView>
        {isRenderDashBoard && !DISABLE_DISCOUNT && <Portal container={document.querySelector(settings.callBookingFormSelector)} disablePortal={!document.querySelector(settings.callBookingFormSelector)}>
          <Link to={routes.stage_discount_request_fill.replace(':flatId', flatId)}>
            <ButtonLarge style={{
              maxWidth: '255px',
              textAlign: 'left'
            }}>
              <ButtonQuestion type="dark" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(routes.about_booking.replace(':flatId', flatId));
              }}/>
                ХОЧУ ОТРИМАТИ ЗНИЖКУ НА ЦІ АПАРТАМЕНТИ
            </ButtonLarge>
          </Link>
        </Portal>}
        {flatInfo && isRenderDashBoard && DISABLE_DISCOUNT && <Portal container={document.querySelector(settings.callBookingFormSelector)} disablePortal={!document.querySelector(settings.callBookingFormSelector)}>
          <Link to={routes.stage_booking_request_fill.replace(':flatId', flatId)}>
            <ButtonLarge style={{
              maxWidth: '255px',
              textAlign: 'left'
            }}>
              <ButtonQuestion type="dark" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(routes.about_booking.replace(':flatId', flatId));
              }}/>
              ЗАБРОНЮВАТИ ОНЛАЙН ЗІ ЗНИЖКОЮ
            </ButtonLarge>
          </Link>
        </Portal>}
      </BrowserView>
      {isRenderDashBoard && <Portal container={document.querySelector(settings.dashboardPortalSelector)} disablePortal={!document.querySelector(settings.dashboardPortalSelector)}>
        <Dashboard lastVisitedPage={lastVisitedPage} flatInfo={flatInfo} flatId={flatId} hideButton={flatInfo.status != '1'}/>
      </Portal>}
      <Routes>
        <Route 
          path={routes.stage_discount_request_repeat_dialog} 
          element={
            <DiscountRequestRepeatDialog
              setUserData={setUserData}
              setDiscountInfo={setDiscountInfo}
              setLastVisitedPage={setLastVisitedPage}
              flatId={flatId}
            />
          }
        />
        <Route 
          path={routes.offerta_agreeement} 
          element={
            <OffertaAgreement goBack={() => {
              if (localHistory.length < 2) {
                navigate(routes.stage_flat.replace(':flatId', flatId));
                return;
              }
              navigate(localHistory[localHistory.length - 2]);
            }}/>
          }
        />
        <Route 
          path={routes.stage_discount_request_fill} 
          element={
            <DiscountRequestFilling 
              requestDiscount={requestDiscount}
              discountInfo={discountInfo}
              navigate={navigate} 
              userData={userData} 
              setUserData={setUserData}
              routes={routes}
            />
          }
        />{/* 👈 Renders at /app/ */}
        <Route 
          path={routes.stage_discount_request_pending} 
          element={<DiscountRequestPending
            flatId={flatId} navigate={navigate}
          />}
        />
        <Route 
          path={routes.stage_discount_request_response_success} 
          element={<DiscountRequestSuccess
            flatId={flatId} navigate={navigate} discountInfo={discountInfo} userData={userData} 
          />}
        />
        <Route 
          path={routes.stage_discount_request_response_fail} 
          element={<DiscountRequestFail
            flatId={flatId} navigate={navigate} discountInfo={discountInfo} userData={userData} 
          />}
        />
        <Route 
          path={routes.stage_discount_request_response_repeat} 
          element={<DiscountRequestRepeat
            flatId={flatId} navigate={navigate} discountInfo={discountInfo} userData={userData} 
          />}
        />
        <Route 
          path={routes.about_booking} 
          element={<AboutBooking
            onClose={() => {
              if (localHistory.length < 2) {
                navigate(routes.stage_flat.replace(':flatId', flatId));
                return;
              } else {
                navigate(localHistory[localHistory.length - 2]);
              }
            }}
            setLastVisitedPage={setLastVisitedPage}
            discountInfo={discountInfo} userData={userData} 
          />}
        />
        <Route 
          path={routes.stage_booking_request_fill} 
          element={<BookingRequestFill
            setUserData={setUserData}
            onMount={() => {
              setLastVisitedPage(routes.stage_booking_request_fill.replace(':flatId', flatId));
            }}
            setLastVisitedPage={setLastVisitedPage} routes={routes} flatId={flatId} navigate={navigate} discountInfo={discountInfo} userData={userData} 
          />}
        />
        <Route 
          path={routes.stage_booking_request_response_success} 
          element={<BookingAfterPayment flatId={flatId} onCloseLink={routes.stage_flat.replace(':flatId', flatId)}/>}
        />
      </Routes>
    </>
  )
}

export default App
