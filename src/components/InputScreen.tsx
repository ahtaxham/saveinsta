import { createSignal, type Component } from 'solid-js';
import { toast, Toaster } from 'solid-toast';
import type { HightLightsMainJSONData } from '~/types/highlightsMainTypes';
import type { UserHightLightsJSONData } from '~/types/highlightsTypes';
import type { UserPostJSONData } from '~/types/postTypes';
import type { StoriesJSONData } from '~/types/storiesTypes';


const InputScreen: Component<{}> = (props) => {
  const [urlD, setUrl] = createSignal<String>('');
  const [dataFetch, setData] = createSignal<StoriesJSONData>();
  const [dataFetchHighlights, setDataHighlights] = createSignal<UserHightLightsJSONData>();
  const [dataFetchHighlightsData, setDataHighlightsData] = createSignal<HightLightsMainJSONData>();
  // const [dataFetchPosts, setDataPosts] = createSignal<UserPostJSONData>()
  //loading
  const [loading, setLoading] = createSignal<Boolean>();
  const [loadingHighlights, setLoadingHighlights] = createSignal<Boolean>();
  const [loadingHighlightsData, setLoadingHighlightsData] = createSignal<Boolean>();
  const [loadingPosts, setLoadingPosts] = createSignal<Boolean>();
  const [endLoading, setendLoading] = createSignal<Boolean>();
  const [selectedTab, setSelectedTab] = createSignal<String>('stories');
  //count and end_cursor
  const [count, setCount] = createSignal<number>(30);
  const [endCursor, setEndCursor] = createSignal<String>('');

  //error signal
  // const [error, setError] = createSignal<String>(
  //     ""
  // );
  function formatNumber(number) {
    // Use the toLocaleString method to add suffixes to the number
    return number.toLocaleString('en-US', {
      // add suffixes for thousands, millions, and billions
      // the maximum number of decimal places to use
      maximumFractionDigits: 2,
      // specify the abbreviations to use for the suffixes
      notation: 'compact',
      compactDisplay: 'short',
    });
  }
  let fetchDataUserDataNdStories = async (url: string) => {
    setLoading(true);
    setData(undefined);
    setDataHighlights(undefined);
    setDataHighlightsData(undefined);
    setPosts([]);

    try {
      if (url.includes('instagram.com/stories/')) {
        let response = await fetch(`/is/user.json?username=${url.split('/stories/')[1].split('/')[0]}`);
        let data = await response.json();
        setData(data);
        setLoading(false);
        return;
      } else if (url.includes('instagram.com/')) {
        let response = await fetch(`/is/user.json?username=${url.split('instagram.com/')[1]}`);
        let data = await response.json();
        setData(data);
        setLoading(false);
        return;
      } else {
        let response = await fetch(`/is/user.json?username=${url}`);
        let data = await response.json();
        setData(data);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      // setError("Invalid URL or Username");
      console.log(error);
      toast.error('Invalid URL or Username', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          'font-size': '16px',
        },
      });
    }
  };
  let fetchDataUserHighlights = async (url: string) => {
    setLoadingHighlights(true);
    try {
      let response = await fetch(`/is/userhighlight.json?username=${url}`);
      let data = await response.json();
      setDataHighlights(data);
      setLoadingHighlights(false);
      return;
    } catch (error) {
      setLoadingHighlights(false);
      // setError("Invalid URL or Username");
      console.log(error);
      toast.error('Invalid URL or Username', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          'font-size': '16px',
        },
      });
    }
  };
  let fetchDataUserHighlightsData = async (id: string) => {
    setLoadingHighlightsData(true);
    try {
      let response = await fetch(`/is/userhighlightid.json?id=${id}`);
      let data = await response.json();
      setDataHighlightsData(data);
      setLoadingHighlightsData(false);
      return;
    } catch (error) {
      setLoadingHighlightsData(false);
      // setError("Invalid URL or Username");
      console.log(error);
      toast.error('Invalid URL or Username', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          'font-size': '16px',
        },
      });
    }
  };
  const [posts, setPosts] = createSignal<UserPostJSONData['data']['items']>([]);
  const [hasNextPage, setHasNextPage] = createSignal(false);

  const loadPosts = async ({
    loadings
  }) => {
    if (loadings) {
      setLoadingPosts(true);

    }
    const response = await fetch(
      `/is/userpost.json?id=${dataFetch()!.userData.data.id}&count=${count()}&end_cursor=${endCursor()}`
    );
    const data: UserPostJSONData = await response.json();
    if (data.data.page_info.has_next_page) {
      setPosts([...posts(), ...data.data.items]);
      setEndCursor(data.data.page_info.end_cursor);
      setHasNextPage(data.data.page_info.has_next_page);
    }
    setendLoading(false);
    setLoadingPosts(false);
  };

  const loadMore = () => {
    if (hasNextPage()) {
      setendLoading(true);

      loadPosts(
        {
          loadings: false
        }
      );
    } else {
      toast.error('No more posts to load', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          'font-size': '16px',
        },
      });
    }
  };
  // let fetchDataUserPosts = async (
  // ) => {
  //   setLoadingPosts(true);

  //   try {

  //     let response = await fetch(`/is/userpost.json?id=${dataFetch()!.userData.data.id}&count=${count()}&end_cursor=${endCursor()}`);
  //     let data = await response.json();

  //     if (dataFetchPosts()?.data != null) {
  //       dataFetchPosts()?.data.items.push(...data.data.items)
  //     } else {
  //       setDataPosts(data)
  //     }

  //     setLoadingPosts(false);

  //     if (data.data.page_info.has_next_page == true) {
  //       setEndCursor(data.data.page_info.end_cursor)
  //       //increment the count
  //       setCount(count() + 30);
  //     }

  //     return;
  //   }
  //   catch (error) {
  //     setLoadingPosts(false);
  //     // setError("Invalid URL or Username");
  //     console.log(error)
  //     toast.error("Invalid URL or Username",
  //       {
  //         duration: 3000,
  //         position: "bottom-center",
  //         style: {

  //           "font-size": "16px",
  //         }
  //       }
  //     );
  //   }
  // }
  return (
    <div>
      <Toaster />
      <div
        id="form"
        class="text-gray-600 h-14 border-[1px] border-blue-500 shadow-md rounded-lg flex items-center my-3"
      >
        <input
          x-ref="input"
          placeholder="Paste Instagram Story URL / Username"
          class="bg-transparent text-m w-full pl-2 font-semibold h-full rounded-full text-sm focus:outline-none text-black"
          required={true}
          type="text"
          onChange={(e) => setUrl(e.currentTarget.value)}
          value={urlD() as string} // Fix: Change the type of urlD from String to string
        />
        <button
          onclick={async (e) => {
            e.preventDefault();

            //ask for permission to access clipboard readText
            await navigator.permissions.query({ name: 'clipboard-read' as any }).then((result) => {
              if (result.state == 'granted' || result.state == 'prompt') {
                navigator.clipboard.readText().then((text) => {
                  setUrl(text);
                });
              }
            });

            navigator.clipboard.readText().then((text) => {
              setUrl(text);
            });
          }}
          class="flex justify-center items-center p-2 border-[1px] text-xs font-semibold shadow-md mr-2 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 60 58">
            <path d="M17.5 12h17c.8 0 1.5-.7 1.5-1.5V6c0-2.2-1.8-4-4-4H20c-2.2 0-4 1.8-4 4v4.5c0 .8.7 1.5 1.5 1.5z"></path>
            <path d="M44 6h-2.5c-.8 0-1.5.7-1.5 1.5V12c0 2.2-1.8 4-4 4H16c-2.2 0-4-1.8-4-4V7.5c0-.8-.7-1.5-1.5-1.5H8c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h36c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm-6 35c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2zm0-8c0 .6-.4 1-1 1H15c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1h22c.6 0 1 .4 1 1v2z"></path>
          </svg>
          Paste
        </button>
        <button
          onclick={(e) => {
            e.preventDefault();
            if (urlD() == '') {
              toast.error('Please enter a valid url or username', {
                duration: 3000,
                position: 'bottom-center',
                style: {
                  'font-size': '16px',
                },
              });
            } else {
              fetchDataUserDataNdStories(urlD() as string);
            }
          }}
          class="mr-2 p-1 bg-blue-600 shadow-md h-10 rounded text-white"
        >
          <span class="px-1 flex items-center font-medium tracking-wide"> Download </span>
        </button>
      </div>
      {loading() ? (
        <div class="flex items-center justify-center">
          <svg class="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle fill="none" stroke-opacity="1" stroke="#0013FF" stroke-width=".5" cx="100" cy="100" r="0">
              <animate
                attributeName="r"
                calcMode="spline"
                dur="2"
                values="1;80"
                keyTimes="0;1"
                keySplines="0 .2 .5 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                calcMode="spline"
                dur="2"
                values="0;25"
                keyTimes="0;1"
                keySplines="0 .2 .5 1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                calcMode="spline"
                dur="2"
                values="1;0"
                keyTimes="0;1"
                keySplines="0 .2 .5 1"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      ) : dataFetch() && dataFetch()!.userData.status == 'ok' ? (
        <div>
          <div class="flex items-center justify-center">
            <div class="relative">
              <img
                crossOrigin="anonymous"
                src={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(dataFetch()!.userData.data.profile_pic_url_hd)}&type=${'.png'}&title=${Math.floor(Math.random() * 100000000000)}`}
                alt="profile"
                class="rounded-full h-32 w-32"
              />
              <a
                href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(
                  dataFetch()!.userData.data.profile_pic_url_hd
                )}&type=${'.png'}&title=${Math.floor(Math.random() * 100000000000)}`}
                class="absolute bottom-0 right-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7 17h10v-2H7zm5-3l4-4l-1.4-1.4l-1.6 1.55V6h-2v4.15L9.4 8.6L8 10zm0 8q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
                  />
                </svg>
              </a>
            </div>{' '}
            <div class="ml-4">
              <h1 class="text-lg font-semibold">{dataFetch()!.userData.data.full_name}</h1>
              <a
                href={'http://instagram.com/' + dataFetch()!.userData.data.username}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p class="text-sm font-semibold te</svg>xt-gray-500">@{dataFetch()!.userData.data.username}</p>
              </a>
            </div>
          </div>
          <div class="mt-4 flex justify-around">
            <div class="flex flex-col items-center justify-center">
              <div class="text-2xl font-semibold"> {formatNumber(dataFetch()!.userData.data.post_count)}</div>
              <div>posts</div>
            </div>
            <div class="flex flex-col items-center justify-center">
              <div class="text-2xl font-semibold">{formatNumber(dataFetch()!.userData.data.followers)}</div>
              <div>followers</div>
            </div>
            <div class="flex flex-col items-center justify-center">
              <div class="text-2xl font-semibold">{formatNumber(dataFetch()!.userData.data.followings)}</div>
              <div>following</div>
            </div>
            {/* <p class="text-sm font-semibold">Followers: {dataFecth()!.userData.data.followers}</p>
            <p class="text-sm font-semibold">Following: {dataFecth()!.userData.data.followings}</p> */}
          </div>

          <p class="text-sm font-semibold mt-3">Bio: {dataFetch()!.userData.data.biography}</p>

          <div class="mt-4">
            <div>
              <div>
                <div class="border-b border-gray-200">
                  <nav class="-mb-px flex gap-6   justify-center">
                    <button
                      onClick={() => setSelectedTab('stories')}
                      class={
                        selectedTab() == 'stories'
                          ? 'shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600'
                          : 'shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    >
                      Stories
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTab('highlights');
                        fetchDataUserHighlights(dataFetch()!.userData.data.username);
                      }}
                      class={
                        selectedTab() == 'highlights'
                          ? 'shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600'
                          : 'shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    >
                      Highlights
                    </button>

                    <button
                      onClick={() => {
                        setSelectedTab('posts');
                        loadPosts({
                          loadings: true
                        });
                      }}
                      class={
                        selectedTab() == 'posts'
                          ? 'shrink-0 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600'
                          : 'shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    >
                      Posts
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {selectedTab() == 'stories' && (
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3  mt-4">
                {dataFetch()!.storyData.data.toString() != '' ? (
                  dataFetch()!.storyData.data.stories.map((story) => {
                    return (
                      <div>
                        <div class="p-3">
                          {story.video_versions ? (
                            <video controls>
                              <source src={story.video_versions[0].url} type="video/mp4" class="rounded-lg w-28" />
                            </video>
                          ) : (
                            <img src={story.image_versions2.candidates[0].url} class="rounded-lg" />
                          )}
                          {/* <img src={story.image_versions2.candidates[1].url} class="rounded-lg" /> */}
                        </div>
                        <a
                          href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(
                            story.video_versions
                              ? story.video_versions[0].url.replace('https://phosphor.ivanenko.workers.dev/?url=', '')
                              : story.image_versions2.candidates[0].url.replace(
                                'https://phosphor.ivanenko.workers.dev/?url=',
                                ''
                              )
                          )}&type=${story.video_versions ? '.mp4' : '.png'}&title=${Math.floor(
                            Math.random() * 100000000000
                          )}`}
                        >
                          <button class="p-1 bg-blue-600 shadow-md h-10 rounded text-white">Download</button>
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <p class="text-red-500 text-sm font-bold pb-20 text-center">
                    {dataFetch()?.storyData?.message ? dataFetch()!.storyData!.message! : 'No Stories Found'}
                  </p>
                )}
              </div>
            )}
            {selectedTab() == 'highlights' && (
              <div>
                {loadingHighlights() ? (
                  <div class="flex items-center justify-center">
                    <svg class="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                      <circle fill="none" stroke-opacity="1" stroke="#0013FF" stroke-width=".5" cx="100" cy="100" r="0">
                        <animate
                          attributeName="r"
                          calcMode="spline"
                          dur="2"
                          values="1;80"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-width"
                          calcMode="spline"
                          dur="2"
                          values="0;25"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-opacity"
                          calcMode="spline"
                          dur="2"
                          values="1;0"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  </div>
                ) : (
                  <div>
                    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3  mt-4">
                      {dataFetchHighlights() && dataFetchHighlights()?.data?.toString() != '' ? (
                        dataFetchHighlights()!.data.highlights.map((highlight) => {
                          return (
                            <div>
                              <div class="p-3">
                                <img
                                  onClick={() => fetchDataUserHighlightsData(highlight.id.split(':')[1])}
                                  src={highlight.cover_media.cropped_image_version.url}
                                  class="rounded-full"
                                />
                                {/* <img src={story.image_versions2.candidates[1].url} class="rounded-lg" /> */}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p class="text-red-500 text-sm font-bold pb-20 text-center">
                          {dataFetchHighlights()?.message ? dataFetchHighlights()!.message! : 'No Highlights Found'}
                        </p>
                      )}
                    </div>
                    {loadingHighlightsData() ? (
                      <div class="flex items-center justify-center">
                        <svg class="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                          <circle
                            fill="none"
                            stroke-opacity="1"
                            stroke="#0013FF"
                            stroke-width=".5"
                            cx="100"
                            cy="100"
                            r="0"
                          >
                            <animate
                              attributeName="r"
                              calcMode="spline"
                              dur="2"
                              values="1;80"
                              keyTimes="0;1"
                              keySplines="0 .2 .5 1"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="stroke-width"
                              calcMode="spline"
                              dur="2"
                              values="0;25"
                              keyTimes="0;1"
                              keySplines="0 .2 .5 1"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="stroke-opacity"
                              calcMode="spline"
                              dur="2"
                              values="1;0"
                              keyTimes="0;1"
                              keySplines="0 .2 .5 1"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </svg>
                      </div>
                    ) : (
                      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3  mt-4">
                        {
                          dataFetchHighlightsData() && dataFetchHighlightsData()?.data.toString() != '' ? (
                            dataFetchHighlightsData()!.data.items.map((item) => {
                              return (
                                <div>
                                  <div class="p-3">
                                    {item.video_hd ? (
                                      <video controls>
                                        <source src={item.video_hd} type="video/mp4" class="rounded-lg w-28" />
                                      </video>
                                    ) : (
                                      <img src={item.image_hd} class="rounded-lg" />
                                    )}
                                    {/* <img src={story.image_versions2.candidates[1].url} class="rounded-lg" /> */}
                                  </div>
                                  <a
                                    href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(
                                      item.video_hd
                                        ? item.video_hd.replace('https://phosphor.ivanenko.workers.dev/?url=', '')
                                        : item.image_hd.replace('https://phosphor.ivanenko.workers.dev/?url=', '')
                                    )}&type=${item.video_hd ? '.mp4' : '.png'}&title=${Math.floor(
                                      Math.random() * 100000000000
                                    )}`}
                                  >
                                    <button class="p-1 bg-blue-600 shadow-md h-10 rounded text-white">Download</button>
                                  </a>
                                </div>
                              );
                            })
                          ) : (
                            <div></div>
                          )
                          //  <p class="text-red-500 text-sm font-bold pb-20 text-center">{
                          //   dataFetchHighlights()?.message ? dataFetchHighlights()!.message! : "No Highlights Found"
                          // }</p>
                        }
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {selectedTab() == 'posts' && (
              <div>
                {loadingPosts() ? (
                  <div class="flex items-center justify-center">
                    <svg class="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                      <circle fill="none" stroke-opacity="1" stroke="#0013FF" stroke-width=".5" cx="100" cy="100" r="0">
                        <animate
                          attributeName="r"
                          calcMode="spline"
                          dur="2"
                          values="1;80"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-width"
                          calcMode="spline"
                          dur="2"
                          values="0;25"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-opacity"
                          calcMode="spline"
                          dur="2"
                          values="1;0"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  </div>
                ) : (
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3  mt-4">
                    {posts().map((post) => {
                      let postd = post.node;
                      return (
                        <div>
                          <div class="p-3">
                            {postd.is_video ? (
                              <video controls>
                                <source
                                  src={
                                    `https://phosphor.ivanenko.workers.dev/?url=` + encodeURIComponent(postd.video_url!)
                                  }
                                  type="video/mp4"
                                  class="rounded-lg w-28"
                                />
                              </video>
                            ) : (
                              <img
                                src={`https://phosphor.ivanenko.workers.dev/?url=${encodeURIComponent(postd.display_url)}`}
                                class="rounded-lg"
                              />
                            )}
                            {/* <img src={story.image_versions2.candidates[1].url} class="rounded-lg" /> */}
                          </div>
                          <a
                            href={`https://dl.vid3konline.workers.dev/api/download?url=${encodeURIComponent(
                              postd.is_video ? postd.video_url ?? '' : postd.display_url ?? ''
                            )}&type=${postd.is_video ? '.mp4' : '.png'}&title=${Math.floor(
                              Math.random() * 100000000000
                            )}`}
                          >
                            <button class="p-1 bg-blue-600 shadow-md h-10 rounded text-white">Download</button>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
                {endLoading() && (
                  <div class="flex items
                  -center justify-center">
                    <svg class="w-24 h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                      <circle fill="none" stroke-opacity="1" stroke="#0013FF" stroke-width=".5" cx="100" cy="100" r="0">
                        <animate
                          attributeName="r"
                          calcMode="spline"
                          dur="2"
                          values="1;80"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-width"
                          calcMode="spline"
                          dur="2"
                          values="0;25"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-opacity"
                          calcMode="spline"
                          dur="2"
                          values="1;0"
                          keyTimes="0;1"
                          keySplines="0 .2 .5 1"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                  </div>
                )}

                <div class="flex justify-center pt-10">
                  {hasNextPage() && (
                    <button onClick={() => loadMore()} class="p-1 bg-blue-600 shadow-md h-10 rounded text-white">
                      Load More
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* {error() && <p class="text-red-500 text-sm font-bold">{error().toString()}</p>} */}
    </div>
  );
};
export default InputScreen;
