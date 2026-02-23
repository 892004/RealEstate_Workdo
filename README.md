# RealEstate_Workdo




                <li className="w-full">
                  {/* Blog button */}
                  <button
                    onClick={() => setisOpen(!isOpen)}
                    className="w-full flex justify-between items-center text-xl"
                  >
                    Blog
                    <FaAngleDown
                      className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Drawer under Blog */}
                  {isOpen && (
                    <div className="mt-2 ml-2 text-xl">
                      <Link
                        to="/pages/blog"
                        onClick={() => setopenHamburg(false)}
                      >
                        Blog Page
                      </Link>
                    </div>
                  )}
                </li>